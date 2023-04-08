#!/usr/bin/env node
import { Github } from '../src/lib/github.js';
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import { ConfigstoreService } from '../src/lib/service/configstore.service.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
clear();
console.log(chalk.yellow(figlet.textSync("Gconf", { horizontalLayout: "full" })));
const github = new Github();
const run = async () => {
    try {
        yargs(hideBin(process.argv))
            .usage("\nUsage: $0 [cmd] <args>")
            .alias("h", "help");
        yargs(hideBin(process.argv))
            .command('set', 'set configstore', {
            token: {
                type: "string",
                demandOption: true,
                describe: "Github token",
            }
        }, (argv) => {
            console.log(argv.token);
            const conf = ConfigstoreService.getInstance();
            conf.setdGithubToken(argv.token);
        })
            .command({
            command: 'del',
            describe: 'remove element configstore',
            builder: {
                token: {
                    describe: 'Remove token',
                    demandOption: true,
                    type: 'string'
                }
            },
            handler(argv) {
                if (argv.token === '') {
                    const conf = ConfigstoreService.getInstance();
                    conf.delete();
                }
            }
        })
            .command('repo', 'create repo github', () => {
            github.createRepo();
        })
            .command('issue', 'create issue github', () => {
            github.createIssue();
        }).argv;
    }
    catch (e) {
        console.log(e);
    }
};
run();
//# sourceMappingURL=index.js.map