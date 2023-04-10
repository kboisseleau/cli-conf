export declare class Github {
    private _githubAuthService;
    private _octokit;
    constructor();
    createIssue(): Promise<void>;
    createRepo(): Promise<void>;
    private _catchError;
}
