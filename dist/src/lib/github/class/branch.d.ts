import { DataIssue } from "../../../../src/@model/github/data-issue.interface.js";
export declare class Branch {
    static getAllLocalBranch(): Promise<String[]>;
    static createBranch(octokit: any, issue: DataIssue, owner: string, repo: string): Promise<void>;
    static deleteLocalBranch(): Promise<void>;
}
