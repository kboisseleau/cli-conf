
import { Octokit } from '@octokit/rest'
import { ConfigstoreService } from '../../../service/configstore.service.js'
import { CONFIG_FIELD } from '../../../../src/@model/enum/config-field.enum.js';

export class RefactoryInitGithub {
    static init () {
        const conf = ConfigstoreService.getInstance();
        const githubToken = conf.get(CONFIG_FIELD.githubToken);
        
        if (githubToken) return new Octokit({ auth: githubToken });
 
    }
}