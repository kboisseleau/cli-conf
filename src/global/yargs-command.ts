import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { Github } from '../lib/github/github.js'
import { CONFIG_FIELD } from '../../src/@model/enum/config-field.enum.js'

export class YargsCommande {
    static argv = yargs(hideBin(process.argv))
    static initCommand () {
        const github = new Github()

        this.usage()
        this.commandGithub(github)
        this.argv.argv
    }

    static usage () {
        this.argv.usage("\nUsage: $0 [cmd] <args>").alias("h", "help")
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
}