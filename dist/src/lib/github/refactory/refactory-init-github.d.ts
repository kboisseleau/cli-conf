export declare class RefactoryInitGithub {
    static init(): import("@octokit/core").Octokit & {
        paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
    } & import("@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types.js").RestEndpointMethods & import("@octokit/plugin-rest-endpoint-methods/dist-types/types.js").Api;
}
