import { Github } from '../src/lib/github.js'
import chalk from 'chalk'
import clear  from 'clear'
import figlet  from 'figlet'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

clear()

console.log(
    chalk.yellow(
      figlet.textSync("Gconf", { horizontalLayout: "full" })
    )
  )

  const github = new Github()
const run = () => {
  yargs(hideBin(process.argv))
  .command('repo', 'create repo github', () => {
    github.createRepo()
  }).argv
}

run()
