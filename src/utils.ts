import { extraModules, uiFrameworks } from './constants'

export function getExtraModules() {
  const list: string[] = []
  for (const module of extraModules)
    list.push(`${module.name} | ${module.description}`)

  return list
}

export function getUiFrameworkPackage(name: any) {
  const framework = uiFrameworks.find(m => m.name === name)
  return framework?.package
}
