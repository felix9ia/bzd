import {Command, flags} from '@oclif/command'
import simpleGit, {SimpleGit} from 'simple-git'
import BzdProject from '../bzd/project'
import BzdConfig from '../bzd/config'

export default class Clone extends Command {
  private bzdProject: BzdProject

  private bzdConfig: BzdConfig

  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'repo'}]

  constructor(args: any, opts: any) {
    super(args, opts)
    this.bzdConfig = new BzdConfig(args, opts)
    this.bzdProject = new BzdProject(args, opts)
  }

  async run() {
    const {args, flags} = this.parse(Clone)
    this.log('args', args)
    this.log('flags', flags)

    const repoPath = args.repo
    if (!repoPath) {
      throw  new Error('repoPath is empty')
    }
    const isExist = await this.bzdConfig.hasInitRootDir()
    const projectPath = this.bzdProject.configs.path
    if (isExist) {
      throw new Error(`project has exist, path is: ${projectPath}`)
    }
    await this.bzdProject.create(repoPath, this.bzdConfig.rootDir)
    this.log(`project path: ${projectPath}`)
    await this.bzdProject.clone()

    // await this.bzdConfig.saveProject(this.bzdProject)
  }
}
