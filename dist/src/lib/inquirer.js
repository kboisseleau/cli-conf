import inquirer from 'inquirer';
import minimist from 'minimist';
import { Files } from './files.js';
export class Inquirer {
    static async askGithubCredentials() {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your GitHub username or e-mail address:',
                validate: (value) => value.length ? true : 'Please enter your username or e-mail address.'
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: (value) => value.length ? true : 'Please enter your password.'
            }
        ];
        return inquirer.prompt(questions);
    }
    static askRepoDetails() {
        const argv = minimist(process.argv.slice(2));
        const files = new Files();
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: (value) => value.length ? true : 'Please enter a name for the repository.',
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Optionally enter a description of the repository:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or private:',
                choices: ['public', 'private'],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
    }
    static askIgnoreFiles(filelist) {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders you wish to ignore:',
                choices: filelist,
                default: ['node_modules', 'bower_components']
            }
        ];
        return inquirer.prompt(questions);
    }
    static askIssueDetails() {
        const argv = minimist(process.argv.slice(2));
        const files = new Files();
        const DEFAULT_ISSUE_TITLE = argv._[0] || files.getCurrentDirectoryBase();
        const DEFAULT_ISSUE_DESCRIPTION = argv._[1] || null;
        const DEFAULT_CREATE_BRANCH = 'NON';
        const questions = [
            {
                type: 'input',
                name: 'title',
                message: 'Enter a title for the issue:',
                default: DEFAULT_ISSUE_TITLE,
                validate: (value) => value.length ? true : 'Please enter a name for the repository.'
            },
            {
                type: 'input',
                name: 'description',
                default: DEFAULT_ISSUE_DESCRIPTION,
                message: 'Optionally enter a description of the issue:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Voulez vous créer une branch à partir de cette issue:',
                choices: ['OUI', 'NON'],
                default: DEFAULT_CREATE_BRANCH
            }
        ];
        return inquirer.prompt(questions);
    }
}
//# sourceMappingURL=inquirer.js.map