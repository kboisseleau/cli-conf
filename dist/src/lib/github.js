import { GithubAuthService } from './service/github-auth.service.js';
import { RefactoryInitGithub } from './refactory/refactory-init-github.js';
import chalk from 'chalk';
import { Repos } from './repo.js';
import { Inquirer } from './inquirer.js';
export class Github {
    constructor() {
        this._octokit = RefactoryInitGithub.init();
        this._githubAuthService = GithubAuthService.getInstance();
        this._githubAuthService.setInstance(this._octokit);
    }
    async createIssue() {
        try {
            const inq = new Inquirer();
            const answers = await inq.askIssueDetails();
            const response = await this._octokit.issues.create({
                owner: "kboisseleau",
                repo: "cli-conf",
                title: answers.title,
                body: answers.description,
            });
            console.log(response.data);
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
//# sourceMappingURL=github.js.map