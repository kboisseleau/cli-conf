import { ConfigstoreService } from "../../../../src/service/configstore.service.js";
import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
import { Inquirer } from "../../../../src/lib/inquirer.js";
import chalk from 'chalk';

type Branch = 'OUI' | 'NON'

export class Issue {
    static conf = ConfigstoreService.getInstance();
    static async getIssues (octokit): Promise<any> {
        return await octokit.issues.listForRepo({
            owner: "kboisseleau",
            repo: "gconf",
          });
    }
    
    static async getIssue (octokit): Promise<DataIssue> {
        const {data: issues} = await this.getIssues(octokit)
        const titles: string[] = issues.map(i => i.title)

        const { visibility: title } = await Inquirer.askChoicesIssueBranch(titles)
        return issues.find(i => i.title === title)
      }

      static async getAllSelectionIssue (octokit): Promise<string[]> {
        const {data: issues} = await this.getIssues(octokit)
        const titles: string[] = issues.map(i => `${i.number}-${i.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`)
        titles.push('ALL')
        const { visibility: title } = await Inquirer.askChoicesIssueBranch(titles)

        return title === 'ALL' ? titles : [...title]
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