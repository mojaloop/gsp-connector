import { program } from 'commander'
import { PACKAGE } from './shared/config'
import { startAPISuite } from './api'

// setup cli program
program.version(PACKAGE.version).description('gsp-connector')

// setup standalone command to start service
program.command('all').description('start API services').action(startAPISuite())

// fetch parameters from command line and execute
program.parseAsync(process.argv)
