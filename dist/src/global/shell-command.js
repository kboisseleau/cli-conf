import shell from 'shelljs';
export class ShellCommand {
    static gitCheckoutBranch(name) {
        shell.exec('git fetch origin');
        shell.exec(`git checkout ${name}`);
    }
    static gitRemoveLocalBranch(names) {
        for (const name of names) {
            shell.exec(`git branch -D ${name}`);
        }
    }
}
//# sourceMappingURL=shell-command.js.map