import { SetConfig } from 'src/@model/type/set-config.type.js';
export declare class ConfigstoreService {
    private static instance;
    private _config;
    constructor();
    static getInstance(): ConfigstoreService;
    get(conf: SetConfig): string;
    set(conf: SetConfig, value: any): void;
    delete(): void;
}
