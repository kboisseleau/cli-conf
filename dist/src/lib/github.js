import * as CLI from 'clui';
import Configstore from 'configstore';
import { createBasicAuth } from '@octokit/auth-basic';
import { Inquirer } from 'src/lib/inquirer.js';
import { readFileSync } from 'fs';
export class Github {
    constructor() {
        this._spinner = new CLI.Spinner();
        const packageJson = JSON.parse(readFileSync('../../package.json', 'utf8'));
        this._conf = new Configstore(packageJson.name);
    }
    getInstance() {
        return this._octokit;
    }
    getStoredGithubToken() {
        return this._conf.get('github.token');
    }
    async getPersonalAccesToken() {
        const inquirer = new Inquirer();
        const credentials = await inquirer.askGithubCredentials();
        const status = this._spinner('Authenticating you, please wait...');
        status.start();
        const auth = createBasicAuth({
            username: credentials.username,
            password: credentials.password,
            async on2Fa() {
                return '';
            },
            token: {
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'ginit, the command-line tool for initalizing Git repos'
            }
        });
        try {
            const res = await auth();
            if (res.token) {
                this._conf.set('github.token', res.token);
                return res.token;
            }
            else {
                throw new Error("GitHub token was not found in the response");
            }
        }
        finally {
            status.stop();
        }
    }
}
//# sourceMappingURL=github.js.map