import {Command} from '@oclif/command'
import BzdConfig from './config'

export default class BzdProject extends Command {
  private bzdConfig: BzdConfig

  name = ''

  path = ''

  // backup overload https://juejin.cn/post/6872903521440628744
  constructor(args: any, opts: any, name?: string, path?: string) {
    super(args, opts)
    this.bzdConfig = new BzdConfig(args, opts)

    if (name) {
      this.name = name
    }
    if (path) {
      this.path = path
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
    this.name = this.parseProjectName(repoPath)
    this.path = await this.bzdConfig.createProjectDir(this)
  }

  async run() {
    return Promise.resolve(undefined)
  }
}
