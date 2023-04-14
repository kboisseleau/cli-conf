import { GithubAuthService } from '../../service/github-auth.service.js'
import { RefactoryInitGithub } from './refactory/refactory-init-github.js'
import chalk from 'chalk'
import { Repos } from '../repo.js'
import { Inquirer } from '../inquirer.js'
import {  } from '@octokit/types'
import { Issue } from 'src/@model/github/issue.interface.js'

export class Github {
    private _githubAuthService: GithubAuthService
    private _octokit

    constructor () {
        this._octokit = RefactoryInitGithub.init()
        this._githubAuthService = GithubAuthService.getInstance()
        this._githubAuthService.setInstance(this._octokit)
    }

    public async createBranchFromIssue() {
      try {
        const {data: issues} = await this._octokit.issues.listForRepo({
          owner: "kboisseleau",
          repo: "gconf",
        });
        const titles: string[] = issues.map(i => i.title) 
        const answers: { visibility: string } = await Inquirer.askChoicesIssueBranch(titles)
        const issue: Issue = issues.find(i => i.title === answers.visibility)
  
        await this._createBranch(issue)
      } catch(err: any) {
        console.error(err)
          this._catchError(err)
        }
    }

    private async _createBranch(issue: Issue) {
      const nameBranch = `${issue.number}-${issue.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
      const owner =  'kboisseleau'
      const repo = 'gconf'

      const { data: branch } = await this._octokit.repos.getBranch({ owner, repo, branch: "develop" });
      const commitSha = branch.commit.sha;

      console.log(commitSha)
      console.log('_createBranch')
      await this._octokit.rest.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${nameBranch}`,
        sha: commitSha,
      });

      await this._octokit.issues.update({ owner, repo, issue_number: issue.number, labels: ["branch-created"], body: `This issue has been branched to ${nameBranch}` });
    }

    public async createIssue() {
      try {
        const answers = await Inquirer.askIssueDetails()
        const response = await this._octokit.issues.create({
          owner: "kboisseleau",
          repo: "gconf",
          title: answers.title,
          body: answers.description,
        });
        
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