import * as os from 'os'
import * as fs from 'fs'
import {stringify} from 'yaml'
import {YAMLMap} from 'yaml/types'
import {Command} from '@oclif/command'
import BzdProject from './project'

export default class BzdConfig extends Command {
  rootDir: string

  constructor(args: any, opts: any) {
    super(args, opts)
    this.rootDir = os.homedir() + '/.bzd'
  }

  getRootDir(): string {
    return this.rootDir
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

  async saveProject(project: BzdProject) {
    const projects: BzdProject[] = [
      project,
    ]
    await this.saveProjects(projects)
  }

  async saveProjects(projects: BzdProject[]) {
    const oldConfigMap = await this.getExistProjectConfigs()
    const newConfigMap = await this.createProjects(projects)
    await this.overwriteProjects(newConfigMap, oldConfigMap)
  }

  async createProjects(projects: BzdProject[]): Promise<YAMLMap> {
    const configMapByProjectName = new YAMLMap()
    projects.forEach(project => {
      configMapByProjectName.set(project.configs.name, project.configs)
    })

    return configMapByProjectName
  }

  async overwriteProjects(newConfigMap: YAMLMap, oldConfigMap: YAMLMap) {
    // TODO 遍历是否有重复的,有则用新的覆盖旧的
    this.log('old: ', newConfigMap, oldConfigMap)
    const projectsConfig = new YAMLMap()
    stringify(projectsConfig)
    // TODO 保存
  }

  async run() {
    return ''
  }
}
