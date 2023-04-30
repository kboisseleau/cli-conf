import { GithubAuthService } from '../../service/github-auth.service.js'
import chalk from 'chalk'
import { Repos } from '../repo.js'
import { Issue } from './class/issue.js'
import { Branch } from './class/branch.js'
import { Octokit } from '@octokit/rest'
import { Files } from '../files.js'

export class Github {
    private _githubAuthService: GithubAuthService
    private _octokit
    private _conf
    private _owner
    private _repo
    private _token

    constructor () {
      this._conf = Files.getGconfJson()
      this._token = this._conf.token
      this._repo = this._conf.repo
      this._owner = this._conf.owner

      if (this._token) {
        this._octokit = new Octokit({ auth: this._token })
        this._githubAuthService = GithubAuthService.getInstance()
        this._githubAuthService.setInstance(this._octokit)
      }

    }


    public async createBranchFromIssue() {
      try {
        this._configVerify()
        const issue = await Issue.getIssue(this._octokit, this._owner, this._repo)
  
        await Branch.createBranch(this._octokit, issue, this._owner, this._repo)
      } catch(err: any) {
        console.error(err)
          this._catchError(err)
        }
    }

    public async deleteLocalBranch () {
      try {
        await Branch.deleteLocalBranch()
      } catch(err: any) {
        this._catchError(err)
      }
    }


    public async createIssue() {
      try {
        this._configVerify()
        const answers = await Issue.createIssue(this._octokit, this._owner, this._repo)

        answers.branch === 'OUI' && Branch.createBranch(this._octokit, answers.issue, this._owner, this._repo)    
      } catch(err: any) {
          this._catchError(err)
        }
    }

    public async createRepo () {
        try {
          this._configVerify()
            const repo = new Repos()
            // Create remote repository
            const url = await repo.createRemoteRepo()
        
            // Create .gitignore file
            await repo.createGitignore()
        
            // Set up local repository and push to remote
            await repo.setupRepo(url)
        
            console.log(chalk.green('All done!'));
          } catch(err: any) {
            this._catchError(err)
          }
    }

    private _configVerify () {
      if (!this._repo) {
        console.log(chalk.red('Veuillez renseigner un repo avec la commande suivant: cgg config -r <repo>'))
        process.exit()
      }

      if (!this._owner) {
        console.log(chalk.red('Veuillez renseigner un owner avec la commande suivant: cgg config -o <owner> !'))
        process.exit()
      }

      if (!this._token) {
        console.log(chalk.red('Veuillez renseigner un token avec la commande suivant: cgg config -t <token> !'))
        process.exit()
      }
    }

    private _catchError(err: any): void {
        const errorMessages = {
          401: "Couldn't log you in. Please provide correct credentials/token.",
          422: "There is already a remote repository or token with the same name",
        };
        const errorMessage = errorMessages[err.status] || err.message || err;
        console.error(chalk.red(errorMessage));
    }
}