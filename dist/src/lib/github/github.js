import { GithubAuthService } from '../../service/github-auth.service.js';
import { RefactoryInitGithub } from './refactory/refactory-init-github.js';
import chalk from 'chalk';
import { Repos } from '../repo.js';
import { Inquirer } from '../inquirer.js';
export class Github {
    constructor() {
        this._octokit = RefactoryInitGithub.init();
        this._githubAuthService = GithubAuthService.getInstance();
        this._githubAuthService.setInstance(this._octokit);
    }
    async createBranchFromIssue() {
        try {
            const { data: issues } = await this._octokit.issues.listForRepo({
                owner: "kboisseleau",
                repo: "gconf",
            });
            const titles = issues.map(i => i.title);
            const answers = await Inquirer.askChoicesIssueBranch(titles);
            const issue = issues.find(i => i.title === answers.visibility);
            await this._createBranch(issue);
        }
        catch (err) {
            console.error(err);
            this._catchError(err);
        }
    }
    async _createBranch(issue) {
        const nameBranch = `${issue.number}-${issue.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
        const owner = 'kboisseleau';
        const repo = 'gconf';
        const { data: branch } = await this._octokit.repos.getBranch({ owner, repo, branch: "develop" });
        const commitSha = branch.commit.sha;
        console.log(commitSha);
        console.log('_createBranch');
        await this._octokit.rest.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${nameBranch}`,
            sha: commitSha,
        });
        await this._octokit.issues.update({ owner, repo, issue_number: issue.number, labels: ["branch-created"], body: `This issue has been branched to ${nameBranch}` });
    }
    async createIssue() {
        try {
            const answers = await Inquirer.askIssueDetails();
            const response = await this._octokit.issues.create({
                owner: "kboisseleau",
                repo: "gconf",
                title: answers.title,
                body: answers.description,
            });
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