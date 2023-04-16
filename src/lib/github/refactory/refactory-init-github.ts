
import { Octokit } from '@octokit/rest'
import { ConfigstoreService } from '../../../service/configstore.service.js'

export class RefactoryInitGithub {
    static init () {
        const conf = ConfigstoreService.getInstance();
        const githubToken = conf.getStoredGithubToken();
        
        if (githubToken) return new Octokit({ auth: githubToken });
 
    }
}