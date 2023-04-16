import shell from 'shelljs';

export class ShellCommand {
    static gitCheckoutBranch (name: string) {
        shell.exec('git fetch origin')
        shell.exec(`git checkout ${name}`)
    }
}