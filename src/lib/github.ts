import { GithubAuthService } from './service/github-auth.service.js'
import { RefactoryInitGithub } from './refactory/refactory-init-github.js'
import chalk from 'chalk'
import { Repos } from './repo.js'

export class Github {
    private _githubAuthService: GithubAuthService

    constructor () {
        const octokit = RefactoryInitGithub.init()
        this._githubAuthService = GithubAuthService.getInstance()
        this._githubAuthService.setInstance(octokit)
    }

    public async createRepo () {
        try {
            const repo = new Repos()
            // Create remote repository
            const url = await repo.createRemoteRepo()
        
            // Create .gitignore file
            await repo.createGitignore()
        
            // Set up local repository and push to remote
            await repo.setupRepo(url)
        
            console.log(chalk.green('All done!'));
          } catch(err) {
              if (err) {
                switch (err.status) {
                  case 401:
                    console.log(chalk.red('Couldn\'t log you in. Please provide correct credentials/token.'));
                    break;
                  case 422:
                    console.log(chalk.red('There is already a remote repository or token with the same name'));
                    break;
                  default:
                    console.log(chalk.red(err));
                }
              }
          }
    }
}