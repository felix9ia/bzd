import {YAMLMap} from 'yaml'

export default class BzdConfig {
  static projectsKey = 'projects'

  rootDir!: string

  configFile !: string

  projects!: YAMLMap
}
