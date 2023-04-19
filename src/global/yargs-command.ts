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
        .command('token', 'set configstore', (yargs) => {
            yargs
              .option('s', {
                alias: 'set',
                describe: 'Définir un token Github dans la configuration de l\'application',
                type: 'boolean',
                requiresArg: true
              })
              .option('d', {
                alias: 'delete',
                describe: 'Supprimer un token Github dans la configuration de l\'application',
                type: 'boolean',
                requiresArg: false
              })

              const argv = yargs.argv
              console.log(argv)
            //   const conf = ConfigstoreService.getInstance()
              if (argv.d) {
                // conf.delete()
              } else if (argv.s) {
                const token = argv._.pop()
                console.log(token)
                // conf.setdGithubToken(argv.token)
              }
        })
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