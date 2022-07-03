#!/usr/bin/env node

import { resolve } from 'path'
import { create } from 'create-create-app'
import pc from 'picocolors'
import { getExtraModules, getUiFrameworkPackage } from './utils'
import { addExtraModules, installEslint, installUiFramework, updateNuxtConfig } from './modules'

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
    eslint: {
      type: 'confirm',
      describe: 'Use ESLint?',
      prompt: 'if-no-arg',
    },
  },
  after: ({ answers, packageDir }) => {
    console.log(answers)
    if (answers.uiFramework !== 'None')
      installUiFramework(packageDir, answers.uiFramework)
    if (answers.nuxtModules)
      addExtraModules(packageDir, answers.nuxtModules)
    if (answers.eslint)
      installEslint(packageDir)
    const modules = [...answers.nuxtModules, ...answers.uiFramework === 'None' ? [] : [getUiFrameworkPackage(answers.uiFramework)]]
    updateNuxtConfig(packageDir, modules)
  },
  caveat: ({ answers }) => {
    console.log(`
    ${pc.green(`Change your directory to project directory with 'cd ${answers.name}' command`)} 
    ${pc.yellow('Install dependencies with \'npm install\', \'yarn install\' or \'pnpm install --shamefully-hoist\'')}
    ${pc.yellow('And start development server with \'npm run dev\', \'yarn dev\' or \'pnpm dev\' ')}
    `)
  },
})
