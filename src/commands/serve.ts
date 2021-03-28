import {prompt} from 'inquirer'
import {Command, flags} from '@oclif/command'
import BzdConfigure from '../bzd/configure'
import ProjectConfig from '../bzd/project-config'

const quesOfEnv = {
  name: 'env',
  message: 'select a environment',
  type: 'list',
  choices: [{name: 'dev'}, {name: 'test'}, {name: 'prod'}],
}

export default class Serve extends Command {
  private bzdConfigure: BzdConfigure

  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h', description: 'show help'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    // flag with a value (-p, --project=VALUE)
    project: flags.string({char: 'p', description: 'specify a project to deploy'}),
  }

  static args = [{name: '', options: ['dev', 'test', 'prod']}]

  constructor(args: any, opts: any) {
    super(args, opts)
    this.bzdConfigure = new BzdConfigure(args, opts)
  }

  async run() {
    const {args, flags} = this.parse(Serve)
    this.log('args: ', args)
    this.log('flags: ', flags)
    let env = args.env

    let {project} = flags
    const questions: any[] = []
    let projects: ProjectConfig[] = []

    if (!env) {
      questions.push(quesOfEnv)
    }

    if (!project) {
      projects = await this.bzdConfigure.getProjects()
      const choices = projects.map(p => {
        return {
          name: p.name,
        }
      })
      const quesOfProject = {
        name: 'proj',
        message: 'select a project',
        type: 'list',
        choices,
      }
      questions.push(quesOfProject)
    }

    if (questions.length !== 0) {
      const responses: any = await prompt(questions)
      project = project ? project : responses.proj

      env = env ? env : responses.env
    }
    const projectIsExist = projects.find(p => p.name !== env)
    if (!projectIsExist) {
      throw new Error('project not found')
    }

    this.log(`the env is: ${env}`)
    this.log(`the project is: ${project}`)
    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /Users/jiapengfei/ShellProjects/bzd/src/commands/run.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
