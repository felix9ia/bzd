import * as os from 'os'
import * as fs from 'fs'
import {stringify, parseDocument, YAMLMap} from 'yaml'
import {Command} from '@oclif/command'
import BzdProject from './project'
import BzdConfig from './bzd-config'

export default class BzdConfigure extends Command {
  rootDir: string

  configFile: string

  bzdConfig: BzdConfig

  projectConfigMap: YAMLMap

  constructor(args: any, opts: any) {
    super(args, opts)
    const defaultRootDir = '/.bzd'
    const configName = 'config.yaml'

    this.rootDir = os.homedir() + defaultRootDir
    this.configFile = `${this.rootDir}/${configName}`

    this.bzdConfig = new BzdConfig()
    this.bzdConfig.rootDir = this.rootDir
    this.bzdConfig.configFile = this.configFile

    this.projectConfigMap = new YAMLMap()
  }

  async hasInitRootDir(): Promise<boolean> {
    try {
      await fs.promises.stat(this.rootDir)
      return true
    } catch (error) {
      return false
    }
  }

  async getExistProjectConfigs(): Promise<any> {
    let allConfigData: string

    try {
      allConfigData = await this.readConfig()
    } catch (error) {
      allConfigData = ''
    }

    const configDoc = parseDocument(allConfigData)
    const projectConfig = configDoc.get(BzdConfig.projectsKey)
    if (projectConfig) {
      return projectConfig
    }
    return new YAMLMap()
  }

  async createProjectConfig(project: BzdProject): Promise<YAMLMap> {
    const configMapByProjectName = new YAMLMap()
    configMapByProjectName.set(project.configs.name, project.configs)
    return configMapByProjectName
  }

  async saveProject(project: BzdProject) {
    const oldProjectConfigMap = await this.getExistProjectConfigs()
    this.log('oldProjectConfigMap ' + oldProjectConfigMap)

    const newProjectConfigMap = await this.createProjectConfig(project)
    const resultConfigMap = await this.overwriteProjectsConfig(project.configs.name, newProjectConfigMap, oldProjectConfigMap)

    this.bzdConfig.projects = resultConfigMap
    await this.writeConfig()
  }

  async overwriteProjectsConfig(projectName: string, newConfigMap: YAMLMap, oldConfigMap: YAMLMap): Promise<YAMLMap> {
    const oldProjectConfig = oldConfigMap.get(projectName)
    if (oldProjectConfig) {
      this.log('old project config exist, will overwrite')
    } else {
      this.log('new project will add')
    }

    // 覆盖旧的, 或者添加
    oldConfigMap.set(projectName, newConfigMap.get(projectName))
    this.log('current config is: ' + oldConfigMap)
    return oldConfigMap
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
