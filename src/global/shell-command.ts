import shell from 'shelljs';

export class ShellCommand {
    static gitCheckoutBranch (name: string) {
        shell.exec('git fetch origin')
        shell.exec(`git checkout ${name}`)
    }

    static gitRemoveLocalBranch (names: String[]) {
        for (const name of names) {
            shell.exec(`git branch -D ${name}`)
        }
    }
}