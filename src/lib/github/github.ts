import { GithubAuthService } from '../../service/github-auth.service.js'
import chalk from 'chalk'
import { Repos } from '../repo.js'
import { Issue } from './class/issue.js'
import { Branch } from './class/branch.js'
import { ConfigstoreService } from '../../../src/service/configstore.service.js'
import { CONFIG_FIELD } from '../../../src/@model/enum/config-field.enum.js'
import { Octokit } from '@octokit/rest'

export class Github {
    private _githubAuthService: GithubAuthService
    private _octokit
    private _conf
    private _owner
    private _repo

    constructor () {
      this._conf = ConfigstoreService.getInstance()
      const githubToken = this._conf.get(CONFIG_FIELD.githubToken)
      this._repo = this._conf.get(CONFIG_FIELD.githubRepo)
      this._owner = this._conf.get(CONFIG_FIELD.githubOwner)
      
      if (githubToken) this._octokit = new Octokit({ auth: githubToken })

        this._githubAuthService = GithubAuthService.getInstance()
        this._githubAuthService.setInstance(this._octokit)
    }


    public async createBranchFromIssue() {
      try {
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
        const answers = await Issue.createIssue(this._octokit, this._owner, this._repo)

        answers.branch === 'OUI' && Branch.createBranch(this._octokit, answers.issue, this._owner, this._repo)    
      } catch(err: any) {
          this._catchError(err)
        }
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
          } catch(err: any) {
            this._catchError(err)
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