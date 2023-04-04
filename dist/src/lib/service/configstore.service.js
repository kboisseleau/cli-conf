import Configstore from 'configstore';
import { readFileSync } from 'fs';
export class ConfigstoreService {
    constructor() {
        const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
        this._config = new Configstore(packageJson.name);
    }
    static getInstance() {
        if (!ConfigstoreService.instance) {
            ConfigstoreService.instance = new ConfigstoreService();
        }
        return ConfigstoreService.instance;
    }
    getStoredGithubToken() {
        return this._config.get('githubToken');
    }
    setdGithubToken(token) {
        return this._config.set('githubToken', token);
    }
}
//# sourceMappingURL=configstore.service.js.map