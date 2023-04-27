import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { ConfigstoreService } from '../service/configstore.service.js'
import { Github } from '../lib/github/github.js'
import { CONFIG_FIELD } from '../../src/@model/enum/config-field.enum.js'

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

        this.argv
        .command('config', 'set configstore', (yargs) => {
            yargs
              .option('t', {
                alias: 'token',
                describe: 'Définir un token Github dans la configuration de l\'application',
                type: 'boolean',
                requiresArg: false
              })
              .option('r', {
                alias: 'repo',
                describe: 'Définir un repo Github dans la configuration de l\'application',
                type: 'boolean',
                requiresArg: false
              })
              .option('o', {
                alias: 'owner',
                describe: 'Définir un owner Github dans la configuration de l\'application',
                type: 'boolean',
                requiresArg: false
              })

              const argv = yargs.argv
              const conf = ConfigstoreService.getInstance()

              const argument = argv._.pop()

              if (argv.t) {
                conf.set(CONFIG_FIELD.githubToken, argument)
              } else if (argv.r) {
                conf.set(CONFIG_FIELD.githubRepo, argument)
              } else if (argv.o) {
                conf.set(CONFIG_FIELD.githubOwner, argument)
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
}