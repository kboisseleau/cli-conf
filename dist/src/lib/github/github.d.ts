export declare class Github {
    private _githubAuthService;
    private _octokit;
    private _conf;
    private _owner;
    private _repo;
    constructor();
    createBranchFromIssue(): Promise<void>;
    deleteLocalBranch(): Promise<void>;
    createIssue(): Promise<void>;
    createRepo(): Promise<void>;
    private _catchError;
}
