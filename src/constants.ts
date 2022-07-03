import type { Module } from './types'

export const uiFrameworks = [
  {
    name: 'None',
    package: '',
    isDev: false,
  },
  {
    name: 'UnoCSS',
    package: '@unocss/nuxt',
    isDev: true,
  },
  {
    name: 'TailwindCSS',
    package: '@nuxtjs/tailwindcss',
    isDev: true,
  },
  {
    name: 'WindiCSS',
    package: 'nuxt-windicss',
    isDev: true,
  },
]

export const extraModules = [
  {
    name: '@intlify/nuxt3',
    isDev: true,
    description: 'Easy internationalization for Nuxt3',
    folder: {
      name: 'locales',
    },
    extra: null,
  },
  {
    name: '@nuxt/content',
    isDev: true,
    description: 'Git-based Markdown written pages (Dev Dependency)',
    folder: {
      name: 'content',
    },
    extra: null,
  },
  {
    name: '@pinia/nuxt',
    isDev: false,
    description: 'Better state management for Nuxt',
    folder: null,
    extra: [
      {
        name: 'pinia',
        isDev: false,
      },
    ],
  },
] as Module[]

export const nuxtConfig = `
import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
modules:[]
})
`
