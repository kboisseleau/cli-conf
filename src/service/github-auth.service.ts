export class GithubAuthService {
  private static instance: GithubAuthService
  private _octokit

    constructor () {

    }

  
    public static getInstance(): GithubAuthService {
      if (!GithubAuthService.instance) {
        GithubAuthService.instance = new GithubAuthService();
      }

      return GithubAuthService.instance
  }

    public  getInstanceOctokit () {
        return this._octokit
      }

    public setInstance (octokit) {
      return this._octokit = octokit
    }

}