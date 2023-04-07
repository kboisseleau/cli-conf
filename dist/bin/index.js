import { Github } from '../src/lib/github.js';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
clear();
console.log(chalk.yellow(figlet.textSync("Gconf", { horizontalLayout: "full" })));
const github = new Github();
const run = async () => {
    github.createRepo();
};
run();
//# sourceMappingURL=index.js.map