import { Github } from '../lib/github/github.js';
export declare class YargsCommande {
    static argv: any;
    static initCommand(): void;
    static usage(): void;
    static commandForTheConfigStore(): void;
    static commandGithub(github: Github): void;
}
