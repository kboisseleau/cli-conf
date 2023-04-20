import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
import chalk from 'chalk'
import { Inquirer } from "../../../../src/lib/inquirer.js";
import { ShellCommand } from "../../../../src/global/shell-command.js";
import { simpleGit } from 'simple-git'
import { SimpleGit, SimpleGitOptions } from 'simple-git'

export class Branch {

    static async getAllLocalBranch (): Promise<String[]> {
        const options: Partial<SimpleGitOptions> = {
            baseDir: process.cwd(),
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
         }
          const git: SimpleGit = simpleGit(options)
  
          const branches = await git.branchLocal()
          
          // Stockage des noms de branches locales dans un tableau
          return branches.all;
    }

    static async createBranch(octokit, issue: DataIssue, owner: string, repo: string) {
        const nameBranch = `${issue.number}-${issue.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
  
        const { data: branch } = await octokit.repos.getBranch({ owner, repo, branch: "develop" });
        const commitSha = branch.commit.sha;
  
        await octokit.rest.git.createRef({
          owner,
          repo,
          ref: `refs/heads/${nameBranch}`,
          sha: commitSha,
        });
  
        await octokit.issues.update({ owner, repo, issue_number: issue.number, labels: ["branch-created"], body: `This issue has been branched to ${nameBranch}` });
  
        console.log(chalk.green('La branch à bien été créer'));
  
        const { checkout } = await Inquirer.askSwitchedBranch()
  
        checkout === 'OUI' && ShellCommand.gitCheckoutBranch(nameBranch)
      }

    static async deleteLocalBranch() {
        const branchs = await this.getAllLocalBranch()
        branchs.pop()
        branchs.pop()
        const { selectedOptions } = await Inquirer.askChoicesDeleteLocalBranch(branchs)
        ShellCommand.gitRemoveLocalBranch(selectedOptions)
    }
}