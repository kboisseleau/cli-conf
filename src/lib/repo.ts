import CLI  from 'clui'
import { Inquirer } from "./inquirer.js"
import { GithubAuthService } from "./service/github-auth.service.js"
import _ from 'lodash'
import { readdirSync, writeFileSync } from 'fs'
import touch from 'touch'
import { simpleGit } from 'simple-git'
import { SimpleGit, SimpleGitOptions } from 'simple-git'

export class Repos {

    public async createRemoteRepo ()  {
        const inquirer = new Inquirer()
        const Spinner = CLI.Spinner
        const githubAuthService = GithubAuthService.getInstance()
        const octokit = githubAuthService.getInstanceOctokit()
        const answers = await inquirer.askRepoDetails()
        const data = {
          name: answers.name,
          description: answers.description,
          private: (answers.visibility === 'private')
        };
        const status = new Spinner('Creating remote repository...')

        status.start()

        try {
          const response = await octokit.repos.createForAuthenticatedUser(data)

          return response.data.ssh_url
        } finally {
          status.stop()
        }
      }

      public async createGitignore () {
        const inquirer = new Inquirer()
        const filelist = _.without(readdirSync('.'), '.git', '.gitignore')
      
        if (filelist.length) {
          const answers = await inquirer.askIgnoreFiles(filelist)
      
          if (answers.ignore.length) {
            writeFileSync('.gitignore', answers.ignore.join( '\n' ) )
          } else {
            touch('.gitignore')
          }
        } else {
          touch('.gitignore')
        }
      }

      public async setupRepo (url) {
        const options: Partial<SimpleGitOptions> = {
            baseDir: process.cwd(),
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false,
         }
        const git: SimpleGit = simpleGit(options)
        const Spinner = CLI.Spinner
        const status = new Spinner('Initializing local repository and pushing to remote...')
        status.start()
      
        try {
            git.init()
            git.add('.gitignore')
            git.add('./*')
            git.commit('Initial commit')
            git.addRemote('origin', url)
            git.push('origin', 'master')
        } finally {
          status.stop()
        }
      }
}