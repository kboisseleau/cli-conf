export class GithubAuthService {
    constructor() {
    }
    static getInstance() {
        if (!GithubAuthService.instance) {
            GithubAuthService.instance = new GithubAuthService();
        }
        return GithubAuthService.instance;
    }
    getInstanceOctokit() {
        return this._octokit;
    }
    setInstance(octokit) {
        return this._octokit = octokit;
    }
}
//# sourceMappingURL=github-auth.service.js.map