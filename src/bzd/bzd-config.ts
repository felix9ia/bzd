import BzdProject from './project-config'

export default class BzdConfig {
  static projectsKey = 'projects'

  rootDir!: string

  configFile !: string

  projects!: BzdProject[]
}
