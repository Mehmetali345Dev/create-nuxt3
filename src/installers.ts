import fs from 'fs'
import { resolve } from 'path'

const extrasRoot = resolve(__dirname, '..', 'extras')

export const installESLint = (packageDir: string) => {
  // Parse package.json, add eslint dependencies and scripts
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  packageJson.devDependencies.eslint = '*'
  packageJson.devDependencies['@antfu/eslint-config'] = '*'
  packageJson.devDependencies.typescript = '*'

  // Add eslint scripts
  packageJson.scripts.lint = 'eslint .'
  packageJson.scripts['lint:fix'] = 'eslint . --fix'

  // Save package.json and copy eslint configuration
  fs.copyFileSync(`${extrasRoot}/.eslintrc`, `${packageDir}/.eslintrc`)
  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
}

export const installJSHint = (packageDir: string) => {
  // Parse package.json, add jshint dependencies and scripts
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  packageJson.devDependencies.jshint = '*'
  packageJson.devDependencies['@antfu/jshint-config'] = '*'
  packageJson.devDependencies.typescript = '*'

  // Add jshint script
  packageJson.scripts.lint = 'jshint .'

  // Save package.json and copy jshint configuration
  fs.copyFileSync(`${extrasRoot}/.jshintrc`, `${packageDir}/.jshintrc`)
  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
}

export const installTSLint = (packageDir: string) => {
  // Parse package.json, add tslint dependencies and scripts
  const packageJson = JSON.parse(fs.readFileSync(`${packageDir}/package.json`, 'utf8'))

  packageJson.devDependencies.tslint = '*'
  packageJson.devDependencies.typescript = '*'

  // Add tslint script
  packageJson.scripts.lint = 'tslint .'

  // Save package.json and copy tslint configuration
  fs.copyFileSync(`${extrasRoot}/tslint.json`, `${packageDir}/tslint.json`)
  fs.writeFileSync(`${packageDir}/package.json`, JSON.stringify(packageJson, null, 2))
}
