export declare class Github {
    private _githubAuthService;
    private _octokit;
    constructor();
    createBranchFromIssue(): Promise<void>;
    private _createBranch;
    createIssue(): Promise<void>;
    createRepo(): Promise<void>;
    private _catchError;
}
