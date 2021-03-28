import * as fs from 'fs'
import {Command} from '@oclif/command'
import ProjectConfig from './project-config'
import simpleGit, {SimpleGit} from 'simple-git'

export default class BzdProject extends Command {
  configs: ProjectConfig

  // backup overload https://juejin.cn/post/6872903521440628744
  constructor(args: any, opts: any, name?: string, path?: string) {
    super(args, opts)
    this.configs = new ProjectConfig()
    if (name) {
      this.configs.name = name
    }
    if (path) {
      this.configs.path = path
    }
  }

  async isExist(projectPath: string): Promise<boolean> {
    try {
      await fs.promises.stat(projectPath)
      return true
    } catch (error) {
      return false
    }
  }

  async create(projectName: string, repoPath: string, rootDir: string) {
    this.configs.repoPath = repoPath
    this.configs.name = projectName
    const projectPath = `${rootDir}/${this.configs.name}`

    if (await this.isExist(projectPath)) {
      throw new Error(`project path "${projectPath}" has exist`)
    }
    await fs.promises.mkdir(projectPath, {recursive: true})
    this.configs.path = projectPath
  }

  public async clone() {
    const git: SimpleGit = simpleGit()
    try {
      await git.clone(this.configs.repoPath, this.configs.path)
      this.log(`${this.configs.name} clone success`)
    } catch (error) {
      this.log('error: ', error)
    }
  }

  async run() {
    return Promise.resolve(undefined)
  }
}
