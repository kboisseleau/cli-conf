import { Octokit } from '@octokit/rest';
import { Files } from '../files.js';
import { ConfigstoreService } from '../service/configstore.service.js';
export class RefactoryInitGithub {
    static init() {
        let octokit;
        const conf = ConfigstoreService.getInstance();
        if (!conf.getStoredGithubToken()) {
            const files = new Files();
            const gconf = files.getGconfJson();
            conf.setdGithubToken(gconf.token);
            octokit = new Octokit({
                auth: conf.getStoredGithubToken()
            });
        }
        else {
            octokit = new Octokit({
                auth: conf.getStoredGithubToken()
            });
        }
        return octokit;
    }
}
//# sourceMappingURL=refactory-init-github.js.map