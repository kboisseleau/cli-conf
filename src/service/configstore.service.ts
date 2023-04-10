import Configstore from 'configstore'
import { readFileSync } from 'fs'

export class ConfigstoreService {
    private static instance: ConfigstoreService
    private _config
    constructor () {
        const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))
        this._config = new Configstore(packageJson.name)
    }

    public static getInstance(): ConfigstoreService {
        if (!ConfigstoreService.instance) {
            ConfigstoreService.instance = new ConfigstoreService();
        }

        return ConfigstoreService.instance
    }
    public getStoredGithubToken (): string {
        return this._config.get('githubToken')
        }
    
    public setdGithubToken (token: string) {
        return this._config.set('githubToken', token)
        }

    public delete () {
        this._config.delete('githubToken')
    }
}