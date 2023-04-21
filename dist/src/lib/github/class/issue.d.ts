import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
type Branch = 'OUI' | 'NON';
export declare class Issue {
    static getIssues(octokit: any, owner: string, repo: string): Promise<any>;
    static getIssue(octokit: any, owner: string, repo: string): Promise<DataIssue>;
    static getAllSelectionIssue(octokit: any, owner: string, repo: string): Promise<string[]>;
    static createIssue(octokit: any, owner: string, repo: string): Promise<{
        issue: DataIssue;
        branch: Branch;
    }>;
}
export {};
