import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
import { Inquirer } from "../../../../src/lib/inquirer.js";
import chalk from 'chalk';

type Branch = 'OUI' | 'NON'

export class Issue {
    
    static async getIssue (octokit): Promise<DataIssue> {
        const {data: issues} = await octokit.issues.listForRepo({
          owner: "kboisseleau",
          repo: "gconf",
        });
        const titles: string[] = issues.map(i => i.title) 
        const answers: { visibility: string } = await Inquirer.askChoicesIssueBranch(titles)
        return issues.find(i => i.title === answers.visibility)
      }

    static async createIssue(octokit): Promise<{issue: DataIssue, branch: Branch}> {
        const answers = await Inquirer.askIssueDetails()
        const {data: issue} = await octokit.issues.create({
        owner: "kboisseleau",
        repo: "gconf",
        title: answers.title,
        body: answers.description,
        });

        console.log(chalk.green('L\'issue à bien été créer'));

        return { issue, branch: answers.branch }
    }
  
}