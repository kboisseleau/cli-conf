import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
import chalk from 'chalk'
import { Inquirer } from "../../../../src/lib/inquirer.js";
import { ShellCommand } from "../../../../src/global/shell-command.js";

export class Branch {
    
    static async createBranch(octokit, issue: DataIssue) {
        const nameBranch = `${issue.number}-${issue.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`;
        const owner =  'kboisseleau'
        const repo = 'gconf'
  
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
}