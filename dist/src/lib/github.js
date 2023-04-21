import { GithubAuthService } from './service/github-auth.service.js';
import { RefactoryInitGithub } from './refactory/refactory-init-github.js';
export class Github {
    constructor() {
        const octokit = RefactoryInitGithub.init();
        this._githubAuthService = GithubAuthService.getInstance();
        this._githubAuthService.setInstance(octokit);
    }
    async createRepo() {
    }
}
//# sourceMappingURL=github.js.map