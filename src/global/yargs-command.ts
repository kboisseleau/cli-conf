import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { ConfigstoreService } from '../service/configstore.service.js'
import { Github } from '../lib/github/github.js'

export class YargsCommande {
    static argv = yargs(hideBin(process.argv))
    static initCommand () {
        const github = new Github()

        this.usage()
        this.commandForTheConfigStore()
        this.commandGithub(github)
        this.argv.argv
    }

    static usage () {
        this.argv.usage("\nUsage: $0 [cmd] <args>").alias("h", "help")
    }

    static commandForTheConfigStore () {
        const { set, del } = this.listFnArgv()

        this.argv
        .command('set', 'set configstore', {
            token: {
              type: "string",
              demandOption: true,
              describe: "Github token",
            }
          }, set)
        .command('del','remove element configstore', {
            token: {
            describe: 'Remove token',
            demandOption: true,
            type: 'string'
            }
          }, del)
    }

    static commandGithub (github: Github) {
        this.argv
        .command('repo', 'create repo github', () => {
            github.createRepo()
          })
        .command('issue', 'create issue github', () => {
            github.createIssue()
        })
        .command('branch', 'Gérer les branches', (yargs) => {
            yargs
              .option('d', {
                alias: 'delete',
                describe: 'Supprimer une branche',
                type: 'boolean',
                requiresArg: false
              })

              const argv = yargs.argv

              if (argv.d) {
                github.deleteLocalBranch()
              } else {
                github.createBranchFromIssue()
              }
          })
        // .command('branch', 'create branch', () => {
        //     github.createBranchFromIssue()
        // })
    }

    static listFnArgv () {
        const conf = ConfigstoreService.getInstance()

        return {
            set: (argv) => {
                conf.setdGithubToken(argv.token)
            },
            del: (argv) => {
                if (argv.token === '') conf.delete()
            }
        }
    }
}