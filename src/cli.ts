#!/usr/bin/env node

import { resolve } from 'path'
import { create } from 'create-create-app'
import pc from 'picocolors'
import { getExtraModules, getUiFrameworkPackage } from './utils'
import { addExtraModules, installLinter, installPrettier, installUiFramework, updateNuxtConfig } from './modules'

const templateRoot = resolve(__dirname, '..', 'templates')

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

create('create-nuxt3', {
  templateRoot,
  skipNpmInstall: true,
  extra: {
    uiFramework: {
      type: 'list',
      describe: 'Select an UI framework',
      choices: ['None', 'UnoCSS', 'TailwindCSS', 'WindiCSS'],
      prompt: 'if-no-arg',
    },
    nuxtModules: {
      type: 'checkbox',
      describe: 'Select extra Nuxt modules',
      choices: getExtraModules(),
      prompt: 'if-no-arg',
    },
    linterModules: {
      type: 'list',
      describe: 'Select a Linter',
      choices: ['None', 'ESLint', 'JSHint', 'TSLint'],
      prompt: 'if-no-arg',
    },
    prettier: {
      type: 'confirm',
      describe: 'Use Prettier for Formatting?',
      prompt: 'if-no-arg',
    },
  },
  after: ({ answers, packageDir }) => {
    // Installs Selected UI Framework if it is not None
    if (answers.uiFramework !== 'None')
      installUiFramework(packageDir, answers.uiFramework)

    // Installs Additional Nuxt Modules
    if (answers.nuxtModules)
      addExtraModules(packageDir, answers.nuxtModules)

    // Installs Selected Linter if it is not None
    if (answers.linterModules !== 'None')
      installLinter(packageDir, answers.linterModules as string)

    // Installs Prettier if it is selected
    if (answers.prettier)
      installPrettier(packageDir, answers.linterModules === 'ESLint')

    const modules = [...answers.nuxtModules as string[], ...answers.uiFramework === 'None' ? [] : [getUiFrameworkPackage(answers.uiFramework)]]
    updateNuxtConfig(packageDir, modules)
  },

  caveat: ({ name }) => {
    console.log(`
    ${pc.green(`Change your directory to project directory with 'cd ${name}' command`)} 
    ${pc.yellow('Install dependencies with \'npm install\', \'yarn install\' or \'pnpm install --shamefully-hoist\'')}
    ${pc.yellow('And start development server with \'npm run dev\', \'yarn dev\' or \'pnpm dev\' ')}
    `)
  },
})
