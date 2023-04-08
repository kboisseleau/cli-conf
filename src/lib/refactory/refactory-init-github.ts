
import { Octokit } from '@octokit/rest'
import { ConfigstoreService } from '../service/configstore.service.js'
import chalk from 'chalk'

export class RefactoryInitGithub {
    static init () {
        const conf = ConfigstoreService.getInstance()
        
        if (!conf.getStoredGithubToken()) {
            console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
            throw Error()
        }

        const octokit = new Octokit({
            auth: conf.getStoredGithubToken()
        })

        return octokit
    }
}