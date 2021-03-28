import {prompt} from 'inquirer'
import {Command, flags} from '@oclif/command'
import BzdConfigure from '../bzd/configure'
import ProjectConfig from '../bzd/project-config'

export default class Serve extends Command {
  private bzdConfigure: BzdConfigure

  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    stage: flags.string({options: ['dev', 'test', 'prod']}),
  }

  static args = [{name: 'file'}]

  constructor(args: any, opts: any) {
    super(args, opts)
    this.bzdConfigure = new BzdConfigure(args, opts)
  }

  async run() {
    const {args, flags} = this.parse(Serve)
    this.log('args: ', args)
    this.log('flags: ', flags)
    const project: ProjectConfig[] = await this.bzdConfigure.getProjects()
    this.log('project: ', project)
    let stage = flags.stage
    if (!stage) {
      const responses: any = await prompt([{
        name: 'stage',
        message: 'select a stage',
        type: 'list',
        choices: [{name: 'dev'}, {name: 'test'}, {name: 'prod'}],
      }])
      stage = responses.stage
    }
    this.log(`the stage is: ${stage}`)
    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /Users/jiapengfei/ShellProjects/bzd/src/commands/run.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
