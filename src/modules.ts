import fs from 'fs'
import { resolve } from 'path'
import { extraModules, nuxtConfig, uiFrameworks } from './constants'
import type { Module } from './types'
import { installESLint, installJSHint, installTSLint } from './installers'

const extrasRoot = resolve(__dirname, '..', 'extras')

export function installUiFramework(packageDir: string, uiFramework: any) {
  const uiFrameworkModule = uiFrameworks.find(m => m.name === uiFramework)
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))
  if (uiFrameworkModule?.isDev)
    packageJson.devDependencies[uiFrameworkModule.package] = '*'

  else if (uiFrameworkModule?.isDev === false)
    packageJson.dependencies[uiFrameworkModule.package] = '*'

  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
  sortPackageJson(packageDir)
}

export function addExtraModules(packageDir: string, selectedModules: any): void {
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  for (const selectedModule of selectedModules) {
    const module: Module | undefined = extraModules.find(m => m.name === selectedModule.split(' | ')[0])
    if (module?.isDev)
      packageJson.devDependencies[module.name] = '*'

    // If you don't use it gives an error:
    // "TypeError: Object is possibly 'undefined'"
    else if (module?.isDev === false)
      packageJson.dependencies[module.name] = '*'

    if (module?.folder)
      fs.mkdirSync(`${packageDir}/${module.folder.name}`)

    if (module?.extra) {
      for (const extraModule of module.extra) {
        if (extraModule.isDev)
          packageJson.devDependencies[extraModule.name] = '*'

        else
          packageJson.dependencies[extraModule.name] = '*'
      }
    }
  }

  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
  sortPackageJson(packageDir)
}

export function installLinter(packageDir: string, linterModule: string) {
  // Compare linters and install the selected one
  switch (linterModule.toLowerCase()) {
    case 'eslint':
      installESLint(packageDir)
      break

    case 'jshint':
      installJSHint(packageDir)
      break

    case 'tslint':
      installTSLint(packageDir)
      break

    default:
      break
  }

  // Save package.json
  sortPackageJson(packageDir)
}

export function installPrettier(packageDir: string, hasEslint: boolean) {
  // Parse package.json, add prettier dependencies and scripts
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  packageJson.devDependencies.prettier = '*'
  if (hasEslint)
    packageJson.devDependencies['eslint-config-prettier'] = '*'
  packageJson.devDependencies.typescript = '*'

  // Add prettier scripts
  packageJson.scripts.format = 'prettier .'
  packageJson.scripts['format:write'] = 'prettier --write .'

  // Save package.json and copy prettier configuration
  // And if .eslintrc exists, delete it and copy prettier configuration
  fs.copyFileSync(`${extrasRoot}/.prettierrc`, `${packageDir}/.prettierrc`)
  if (hasEslint && fs.existsSync(`${packageDir}/.eslintrc`))
    fs.unlinkSync(`${packageDir}/.eslintrc`)
  if (hasEslint)
    fs.copyFileSync(`${extrasRoot}/.eslintrc-prettier`, `${packageDir}/.eslintrc`)
  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
  sortPackageJson(packageDir)
}

export function updateNuxtConfig(packageDir: string, modules: any) {
  modules = modules.map((module: any) => `"${module.split(' | ')[0]}"`)
  const replacedNuxtConfig = nuxtConfig.replace('\nmodules:[]', `\nmodules: [${modules.join(', ')}]`)
  fs.writeFileSync(`${packageDir}/nuxt.config.ts`, replacedNuxtConfig)
}

function sortPackageJson(packageDir: string) {
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  packageJson.devDependencies = Object.keys(packageJson.devDependencies).sort().reduce(
    (obj: any, key) => {
      obj[key] = packageJson.devDependencies[key]
      return obj
    },
    {},
  )

  packageJson.dependencies = Object.keys(packageJson.dependencies).sort().reduce(
    (obj: any, key) => {
      obj[key] = packageJson.dependencies[key]
      return obj
    },
    {},
  )

  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
}
