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
    async createIssue() {
        try {
            const answers = await Inquirer.askIssueDetails();
            const response = await this._octokit.issues.create({
                owner: "kboisseleau",
                repo: "cli-conf",
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