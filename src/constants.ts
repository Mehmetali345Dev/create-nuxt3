import type { Module, UiFrameworkModule } from './types'

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
] as UiFrameworkModule[]

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
    description: 'Git-based Markdown written pages',
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
  {
    name: '@vueuse/nuxt',
    isDev: true,
    description: 'Collection of essential Vue Composition Utilities',
    folder: null,
    extra: [
      {
        name: '@vueuse/core',
        isDev: true,
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
