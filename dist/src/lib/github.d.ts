export declare class Github {
    private _spinner;
    private _conf;
    private _octokit;
    constructor();
    getInstance(): any;
    getStoredGithubToken(): any;
    getPersonalAccesToken(): Promise<any>;
}
