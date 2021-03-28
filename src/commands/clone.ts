import {Command, flags} from '@oclif/command'
import BzdProject from '../bzd/project'
import BzdConfigure from '../bzd/configure'

export default class Clone extends Command {
  private bzdProject: BzdProject

  private bzdConfigure: BzdConfigure

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
    this.bzdConfigure = new BzdConfigure(args, opts)
    this.bzdProject = new BzdProject(args, opts)
  }

  parseProjectName(repo: string) {
    if (!repo) {
      throw new Error('repo is empty')
    }
    const keys = repo.split('/')
    return keys[keys.length - 1].split('.')[0]
  }

  async run() {
    const {args, flags} = this.parse(Clone)
    this.log('args', args)
    this.log('flags', flags)

    const repoPath = args.repo
    if (!repoPath) {
      throw  new Error('repoPath is empty')
    }
    const projectPath = this.bzdProject.configs.path
    const projectName  =  this.parseProjectName(repoPath)

    await this.bzdProject.create(projectName, repoPath, this.bzdConfigure.rootDir)
    this.log(`project path: ${projectPath}`)
    await this.bzdProject.clone()

    await this.bzdConfigure.saveProject(this.bzdProject)
  }
}
