export declare class ConfigstoreService {
    private static instance;
    private _config;
    constructor();
    static getInstance(): ConfigstoreService;
    getStoredGithubToken(): string;
    setdGithubToken(token: string): any;
    delete(): void;
}
