import * as fs from 'fs'
import {Command} from '@oclif/command'
import BzdConfig from './config'
import ProjectConfig from './project-config'

export default class BzdProject extends Command {
  private bzdConfig: BzdConfig

  configs: ProjectConfig

  // backup overload https://juejin.cn/post/6872903521440628744
  constructor(args: any, opts: any, name?: string, path?: string) {
    super(args, opts)
    this.bzdConfig = new BzdConfig(args, opts)
    this.configs = new ProjectConfig()
    if (name) {
      this.configs.name = name
    }
    if (path) {
      this.configs.path = path
    }
  }

  parseProjectName(repo: string) {
    if (!repo) {
      throw new Error('repo is empty')
    }
    const keys = repo.split('/')
    return keys[keys.length - 1].split('.')[0]
  }

  async initProject(repoPath: string) {
    this.configs.name = this.parseProjectName(repoPath)
    await this.createProject()
    await this.bzdConfig.saveProject(this)
  }

  async createProject() {
    const isExist = await this.bzdConfig.hasInitRootDir()
    const projectPath = `${this.bzdConfig.rootDir}/${this.configs.name}`

    if (isExist) {
      throw new Error(`project has exist, path is: ${projectPath}`)
    } else {
      await fs.promises.mkdir(projectPath, {recursive: true})
      this.log(`project path: ${projectPath}`)
    }
    this.configs.path = projectPath
  }

  async run() {
    return Promise.resolve(undefined)
  }
}
