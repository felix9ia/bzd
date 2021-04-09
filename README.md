bzd
===
> [八斩刀](https://zh.wikipedia.org/wiki/%E5%85%AB%E6%96%AC%E5%88%80),八斩刀为学习咏春拳的应用武器,由八段组成.


## 简介
devops cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bzd.svg)](https://npmjs.org/package/bzd)
[![Downloads/week](https://img.shields.io/npm/dw/bzd.svg)](https://npmjs.org/package/bzd)
[![License](https://img.shields.io/npm/l/bzd.svg)](https://github.com/felix9ia/bzd/blob/master/package.json)

<!-- toc -->
* [研发](#研发)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# 研发
`lint` 到全局的引用。

```
yarn lint
```



# Usage

<!-- usage -->
```sh-session
$ npm install -g bzd
$ bzd COMMAND
running command...
$ bzd (-v|--version|version)
bzd/0.0.1 darwin-x64 node-v12.18.3
$ bzd --help [COMMAND]
USAGE
  $ bzd COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`bzd clone [REPO]`](#bzd-clone-repo)
* [`bzd hello [FILE]`](#bzd-hello-file)
* [`bzd help [COMMAND]`](#bzd-help-command)
* [`bzd lint [FILE]`](#bzd-lint-file)
* [`bzd serve [FILE]`](#bzd-serve-file)

## `bzd clone [REPO]`

clone your repository of build project

```
USAGE
  $ bzd clone [REPO]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/clone.ts](https://github.com/felix9ia/bzd/blob/v0.0.1/src/commands/clone.ts)_

## `bzd hello [FILE]`

describe the command here

```
USAGE
  $ bzd hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ bzd hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/felix9ia/bzd/blob/v0.0.1/src/commands/hello.ts)_

## `bzd help [COMMAND]`

display help for bzd

```
USAGE
  $ bzd help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `bzd lint [FILE]`

describe the command here

```
USAGE
  $ bzd lint [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/lint.ts](https://github.com/felix9ia/bzd/blob/v0.0.1/src/commands/lint.ts)_

## `bzd serve [FILE]`

describe the command here

```
USAGE
  $ bzd serve [FILE]

OPTIONS
  -f, --force
  -h, --help                              show CLI help
  -n, --name=name                         name to print
  --stage=development|staging|production
```

_See code: [src/commands/serve.ts](https://github.com/felix9ia/bzd/blob/v0.0.1/src/commands/serve.ts)_
<!-- commandsstop -->
* [`bzd clone [REPO]`](#bzd-clone-repo)
* [`bzd hello [FILE]`](#bzd-hello-file)
* [`bzd help [COMMAND]`](#bzd-help-command)


# 参考

[NVM](https://github.com/nvm-sh/nvm)  
