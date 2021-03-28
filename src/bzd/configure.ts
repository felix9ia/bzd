import * as os from 'os'
import * as fs from 'fs'
import {stringify} from 'yaml'
import {YAMLMap} from 'yaml/types'
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

  async getExistProjectConfigs(): Promise<YAMLMap> {
    // TODO 查找文件
    // TODO 读取 ymal
    // TODO 读取到 projects 一项
    return new YAMLMap()
  }

  async createProjectConfig(project: BzdProject): Promise<YAMLMap> {
    const configMapByProjectName = new YAMLMap()
    configMapByProjectName.set(project.configs.name, project.configs)
    return configMapByProjectName
  }

  async saveProject(project: BzdProject) {
    this.log('project ' + project)
    // const oldConfigMap = await this.getExistProjectConfigs()
    const newProjectConfigMap = await this.createProjectConfig(project)
    // const resultConfigMap = await this.overwriteProjectsConfig(newConfigMap, oldConfigMap)
    // await this.writeProjectConfig(resultConfigMap)

    this.bzdConfig.projects = newProjectConfigMap
    await this.writeConfig()
  }

  async overwriteProjectsConfig(newConfigMap: YAMLMap, oldConfigMap: YAMLMap): Promise<YAMLMap> {
    // TODO 遍历是否有重复的,有则用新的覆盖旧的
    this.log('old: ', newConfigMap, oldConfigMap)
    return new YAMLMap()
    // TODO 保存
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
