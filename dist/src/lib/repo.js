import CLI from 'clui';
import { Inquirer } from "./inquirer.js";
import { GithubAuthService } from "./service/github-auth.service.js";
import _ from 'lodash';
import { readdirSync, writeFileSync } from 'fs';
import touch from 'touch';
import { simpleGit } from 'simple-git';
export class Repos {
    async createRemoteRepo() {
        console.log('1');
        const inquirer = new Inquirer();
        console.log('1.1');
        const Spinner = CLI.Spinner;
        const githubAuthService = GithubAuthService.getInstance();
        console.log('1.2');
        const octokit = githubAuthService.getInstanceOctokit();
        console.log('1.3', octokit);
        const answers = await inquirer.askRepoDetails();
        console.log('2');
        const data = {
            name: answers.name,
            description: answers.description,
            private: (answers.visibility === 'private')
        };
        console.log('3');
        const status = new Spinner('Creating remote repository...');
        status.start();
        console.log('4');
        try {
            const response = await octokit.repos.createForAuthenticatedUser(data);
            console.log('5');
            return response.data.ssh_url;
        }
        finally {
            status.stop();
        }
    }
    async createGitignore() {
        const inquirer = new Inquirer();
        const filelist = _.without(readdirSync('.'), '.git', '.gitignore');
        if (filelist.length) {
            const answers = await inquirer.askIgnoreFiles(filelist);
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