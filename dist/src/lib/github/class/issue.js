import { Inquirer } from "../../../../src/lib/inquirer.js";
import chalk from 'chalk';
export class Issue {
    static async getIssues(octokit, owner, repo) {
        return await octokit.issues.listForRepo({
            owner,
            repo,
        });
    }
    static async getIssue(octokit, owner, repo) {
        const { data: issues } = await this.getIssues(octokit, owner, repo);
        const titles = issues.map(i => i.title);
        const { visibility: title } = await Inquirer.askChoicesIssueBranch(titles);
        return issues.find(i => i.title === title);
    }
    static async getAllSelectionIssue(octokit, owner, repo) {
        const { data: issues } = await this.getIssues(octokit, owner, repo);
        const titles = issues.map(i => `${i.number}-${i.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}`);
        titles.push('ALL');
        const { visibility: title } = await Inquirer.askChoicesIssueBranch(titles);
        return title === 'ALL' ? titles : [...title];
    }
    static async createIssue(octokit, owner, repo) {
        const answers = await Inquirer.askIssueDetails();
        const { data: issue } = await octokit.issues.create({
            owner,
            repo,
            title: answers.title,
            body: answers.description,
        });
        console.log(chalk.green('L\'issue à bien été créer'));
        return { issue, branch: answers.branch };
    }
}
//# sourceMappingURL=issue.js.map