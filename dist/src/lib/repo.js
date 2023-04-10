import CLI from 'clui';
import { Inquirer } from "./inquirer.js";
import { GithubAuthService } from "../service/github-auth.service.js";
import _ from 'lodash';
import { readdirSync, writeFileSync } from 'fs';
import touch from 'touch';
import { simpleGit } from 'simple-git';
export class Repos {
    async createRemoteRepo() {
        const githubAuthService = GithubAuthService.getInstance();
        const octokit = githubAuthService.getInstanceOctokit();
        const { name, description, visibility } = await Inquirer.askRepoDetails();
        const data = {
            name,
            description,
            private: (visibility === 'private')
        };
        const status = new CLI.Spinner('Creating remote repository...');
        try {
            status.start();
            const response = await octokit.repos.createForAuthenticatedUser(data);
            return response.data.ssh_url;
        }
        catch (err) {
            console.error(`Error creating remote repository: ${err}`);
        }
        finally {
            status.stop();
        }
    }
    async createGitignore() {
        const filelist = _.without(readdirSync('.'), '.git', '.gitignore');
        if (filelist.length) {
            const answers = await Inquirer.askIgnoreFiles(filelist);
            if (answers.ignore.length) {
                writeFileSync('.gitignore', answers.ignore.join('\n'));
            }
            else {
                touch('.gitignore');
            }
        }
        else {
            touch('.gitignore');
        }
    }
    async setupRepo(url) {
        const options = {
            baseDir: process.cwd(),
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
        };
        const git = simpleGit(options);
        const Spinner = CLI.Spinner;
        const status = new Spinner('Initializing local repository and pushing to remote...');
        status.start();
        try {
            git.init();
            git.add('.gitignore');
            git.add('./*');
            git.commit('Initial commit');
            git.addRemote('origin', url);
            git.push('origin', 'master');
        }
        finally {
            status.stop();
        }
    }
}
//# sourceMappingURL=repo.js.map