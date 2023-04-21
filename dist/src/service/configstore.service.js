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
    get(conf) {
        return this._config.get(conf);
    }
    set(conf, value) {
        this._config.set(conf, value);
    }
    delete() {
        this._config.delete('githubToken');
    }
}
//# sourceMappingURL=configstore.service.js.map