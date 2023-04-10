import { Octokit } from '@octokit/rest';
import { ConfigstoreService } from '../../../service/configstore.service.js';
import chalk from 'chalk';
export class RefactoryInitGithub {
    static init() {
        const conf = ConfigstoreService.getInstance();
        const githubToken = conf.getStoredGithubToken();
        if (!githubToken) {
            console.error(chalk.red("Couldn't log you in. Please provide correct credentials/token."));
            process.exit();
        }
        const octokit = new Octokit({ auth: githubToken });
        return octokit;
    }
}
//# sourceMappingURL=refactory-init-github.js.map