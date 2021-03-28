import * as os from 'os'
import * as fs from 'fs'
import {stringify, parse} from 'yaml'
import {Command} from '@oclif/command'
import ProjectConfig from './project-config'
import BzdConfig from './bzd-config'

export default class BzdConfigure extends Command {
  rootDir: string

  configFile: string

  bzdConfig: BzdConfig

  constructor(args: any, opts: any) {
    super(args, opts)
    const defaultRootDir = '/.bzd'
    const configName = 'config.yaml'

    this.rootDir = os.homedir() + defaultRootDir
    this.configFile = `${this.rootDir}/${configName}`

    this.bzdConfig = new BzdConfig()
    this.bzdConfig.rootDir = this.rootDir
    this.bzdConfig.configFile = this.configFile
    this.bzdConfig.projects = []
  }

  async hasInitRootDir(): Promise<boolean> {
    try {
      await fs.promises.stat(this.rootDir)
      return true
    } catch (error) {
      return false
    }
  }

  async getProjects() {
    const oldProjectConfig = await this.getExistProjectConfigs()
    this.log('getProjects:' + oldProjectConfig)
  }

  async saveProject(projectConfig: ProjectConfig) {
    const oldProjectConfigs = await this.getExistProjectConfigs()
    this.log('oldProjectConfigs are: ' + oldProjectConfigs)

    const newProjectConfig = projectConfig
    this.log('newProjectConfig is: ' + newProjectConfig)

    const resultConfigs = await this.overwriteProjectsConfig(projectConfig.name, newProjectConfig, oldProjectConfigs)

    this.bzdConfig.projects = resultConfigs
    await this.writeConfig()
  }

  async overwriteProjectsConfig(projectName: string, newProjectConfig: ProjectConfig, oldProjectConfigs: ProjectConfig[]): Promise<ProjectConfig[]> {
    const findIndex = oldProjectConfigs.findIndex((conf => conf.name === newProjectConfig.name))

    if (findIndex === -1) {
      this.log('new projectConfig will add')
      oldProjectConfigs.push(newProjectConfig)
      return oldProjectConfigs
    }

    oldProjectConfigs[findIndex] = newProjectConfig
    this.log('old projectConfig config exist, will overwrite, current config is: ' + oldProjectConfigs)

    return oldProjectConfigs
  }

  async getExistProjectConfigs(): Promise<ProjectConfig[]> {
    let allConfigData: string

    try {
      allConfigData = await this.readConfig()
    } catch (error) {
      allConfigData = ''
    }

    this.bzdConfig = parse(allConfigData)
    const projectConfig = this.bzdConfig.projects
    if (projectConfig) {
      return projectConfig
    }
    return []
  }

  async readConfig(): Promise<string> {
    try {
      const file = await fs.promises.readFile(this.configFile, {encoding: 'utf8'})
      return file
    } catch (error) {
      throw  new Error('got error when read config')
    }
  }

  async writeConfig() {
    try {
      const data = stringify(this.bzdConfig)
      await fs.promises.writeFile(this.configFile, data)
    } catch (error) {
      throw  new Error('got error when write config')
    }
  }

  async run() {
    return ''
  }
}
