import { GithubAuthService } from '../../service/github-auth.service.js';
import chalk from 'chalk';
import { Repos } from '../repo.js';
import { Issue } from './class/issue.js';
import { Branch } from './class/branch.js';
import { ConfigstoreService } from '../../../src/service/configstore.service.js';
import { CONFIG_FIELD } from '../../../src/@model/enum/config-field.enum.js';
import { Octokit } from '@octokit/rest';
export class Github {
    constructor() {
        this._conf = ConfigstoreService.getInstance();
        const githubToken = this._conf.get(CONFIG_FIELD.githubToken);
        this._repo = this._conf.get(CONFIG_FIELD.githubRepo);
        this._owner = this._conf.get(CONFIG_FIELD.githubOwner);
        if (githubToken)
            this._octokit = new Octokit({ auth: githubToken });
        this._githubAuthService = GithubAuthService.getInstance();
        this._githubAuthService.setInstance(this._octokit);
    }
    async createBranchFromIssue() {
        try {
            const issue = await Issue.getIssue(this._octokit, this._owner, this._repo);
            await Branch.createBranch(this._octokit, issue, this._owner, this._repo);
        }
        catch (err) {
            console.error(err);
            this._catchError(err);
        }
    }
    async deleteLocalBranch() {
        try {
            await Branch.deleteLocalBranch();
        }
        catch (err) {
            this._catchError(err);
        }
    }
    async createIssue() {
        try {
            const answers = await Issue.createIssue(this._octokit, this._owner, this._repo);
            answers.branch === 'OUI' && Branch.createBranch(this._octokit, answers.issue, this._owner, this._repo);
        }
        catch (err) {
            this._catchError(err);
        }
    }
    async createRepo() {
        try {
            const repo = new Repos();
            const url = await repo.createRemoteRepo();
            await repo.createGitignore();
            await repo.setupRepo(url);
            console.log(chalk.green('All done!'));
        }
        catch (err) {
            this._catchError(err);
        }
    }
    _catchError(err) {
        const errorMessages = {
            401: "Couldn't log you in. Please provide correct credentials/token.",
            422: "There is already a remote repository or token with the same name",
        };
        const errorMessage = errorMessages[err.status] || err.message || err;
        console.error(chalk.red(errorMessage));
    }
}
//# sourceMappingURL=github.js.map