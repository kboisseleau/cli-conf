#!/usr/bin/env node
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { YargsCommande } from '../src/global/yargs-command.js';
clear();
console.log(chalk.yellow(figlet.textSync("Gconf", { horizontalLayout: "full" })));
const run = async () => {
    YargsCommande.initCommand();
};
run();
//# sourceMappingURL=index.js.map