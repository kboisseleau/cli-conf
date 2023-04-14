import { exec } from 'shelljs';
export class ShellCommand {
    static gitCheckoutBranch (name: string) {
        exec('git fetch origin')
        exec(`git checkout ${name}`)
    }
}