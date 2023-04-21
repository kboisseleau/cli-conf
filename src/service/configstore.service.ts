import Configstore from 'configstore'
import { readFileSync } from 'fs'
import { SetConfig } from 'src/@model/type/set-config.type.js'

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

    public get (conf: SetConfig): string {
        return this._config.get(conf)
    }
    
    public set (conf: SetConfig, value: any) {
        this._config.set(conf, value)
    }

    public delete () {
        this._config.delete('githubToken')
    }
}