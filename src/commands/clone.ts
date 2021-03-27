import {Command, flags} from '@oclif/command'
import simpleGit, {SimpleGit} from 'simple-git'
import BzdProject from '../bzd/project'

export default class Clone extends Command {
  private bzdProject: BzdProject

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
    this.bzdProject = new BzdProject(args, opts)
  }

  async run() {
    const {args, flags} = this.parse(Clone)
    const git: SimpleGit = simpleGit()
    this.log('args', args)
    this.log('flags', flags)

    const repoPath = args.repo
    await this.bzdProject.initProject(repoPath)
    const projectPath = this.bzdProject.path
    const projectName = this.bzdProject.name

    try {
      if (repoPath) {
        await git.clone(repoPath, projectPath)
        this.log(`${projectName} clone success`)
      }
    } catch (error) {
      this.log('error: ', error)
    }
  }
}
