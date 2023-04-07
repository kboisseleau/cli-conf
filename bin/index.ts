import { Github } from '../src/lib/github.js'
import chalk from 'chalk'
import clear  from 'clear'
import figlet  from 'figlet'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

clear()

console.log(
    chalk.yellow(
      figlet.textSync('Gconf', { horizontalLayout: 'full' })
    )
  )

  const github = new Github()

  yargs(hideBin(process.argv))
  .command('repo', 'create repo github', () => {
    github.createRepo()
  })
  .command('greet', 'greet someone', (yargs) => {
    yargs.option('name', {
      describe: 'name of the person to greet',
      demandOption: true,
      type: 'string'
    });
  }, (argv) => {
    console.log('argv =>', argv)
  })
  .argv;
