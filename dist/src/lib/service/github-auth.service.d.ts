export declare class GithubAuthService {
    private static instance;
    private _octokit;
    constructor();
    static getInstance(): GithubAuthService;
    getInstanceOctokit(): any;
    setInstance(octokit: any): any;
}
