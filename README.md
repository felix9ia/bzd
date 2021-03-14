bzd
===

devops cli

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bzd.svg)](https://npmjs.org/package/bzd)
[![Downloads/week](https://img.shields.io/npm/dw/bzd.svg)](https://npmjs.org/package/bzd)
[![License](https://img.shields.io/npm/l/bzd.svg)](https://github.com/felix9ia/bzd/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
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
* [`bzd hello [FILE]`](#bzd-hello-file)
* [`bzd help [COMMAND]`](#bzd-help-command)

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
<!-- commandsstop -->
