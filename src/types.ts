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
