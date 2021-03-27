import * as os from 'os'
import {Command} from '@oclif/command'
import * as fs from 'fs'
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

  async createProjectDir(project: BzdProject): Promise<string> {
    const isExist = await this.hasInitRootDir()

    const projectPath = `${this.rootDir}/${project.name}`

    if (!isExist) {
      await fs.promises.mkdir(projectPath, {recursive: true})
      this.log(`project path: ${projectPath}`)
    }
    return projectPath
  }

  createOrUpdateConfig(projectName: string) {
    this.log('projectName: ', projectName)
  }

  async run() {
    return ''
  }
}
