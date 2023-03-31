import { Github } from './lib/github.js';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
clear();
console.log(chalk.yellow(figlet.textSync('Gconf', { horizontalLayout: 'full' })));
const github = new Github();
const run = async () => {
    let token = github.getStoredGithubToken();
    console.log(token);
    if (!token) {
        token = await github.getPersonalAccesToken();
    }
    console.log(token);
};
run();
//# sourceMappingURL=index.js.map