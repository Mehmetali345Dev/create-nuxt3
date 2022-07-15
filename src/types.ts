export interface Module {
  name: string
  isDev: boolean
  description: string
  folder: {
    name: string
  } | null
  extra: [
    {
      name: string
      isDev: boolean
    },
  ] | null
}

export interface UiFrameworkModule {
  name: string
  package: string
  isDev: boolean
}
