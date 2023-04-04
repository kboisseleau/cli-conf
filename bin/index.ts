#!/usr/bin/env node
import { Github } from "../src/lib/github.js"
import chalk from "chalk"
import clear  from "clear"
import figlet  from "figlet"

import { Repos } from "../src/lib/repo.js"
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
clear()

console.log(
    chalk.yellow(
      figlet.textSync("Gconf", { horizontalLayout: "full" })
    )
  )

  new Github()
  
  const run = async () => {
    try {
      const repo = new Repos()
      // Create remote repository
      const url = await repo.createRemoteRepo()
  
      // Create .gitignore file
      await repo.createGitignore()
  
      // Set up local repository and push to remote
      await repo.setupRepo(url)
  
      console.log(chalk.green("All done!"));
    } catch(err: any) {
        if (err) {
          switch (err.status) {
            case 401:
              console.log(chalk.red("Couldn\"t log you in. Please provide correct credentials/token."));
              break;
            case 422:
              console.log(chalk.red("There is already a remote repository or token with the same name"));
              break;
            default:
              console.log(chalk.red(err));
          }
        }
    }
  }

  run()