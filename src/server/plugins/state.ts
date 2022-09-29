import {  Logger as SDKLogger } from '@mojaloop/sdk-standard-components'
import { ResponseToolkit, Server } from '@hapi/hapi'
import { logger } from '../../shared/logger'

export interface StateResponseToolkit extends ResponseToolkit {
  getLogger: () => SDKLogger.Logger
}

export const StatePlugin = {
  version: '1.0.0',
  name: 'StatePlugin',
  once: true,

  register: async (server: Server): Promise<void> => {
    try {
      // prepare toolkit accessors
      server.decorate('toolkit', 'getLogger', (): SDKLogger.Logger => logger)
      // disconnect from redis when server is stopped
      server.events.on('stop', async () => {
        logger.info('StatePlugin: Server stopped')
      })
    } catch (err) {
      logger.error('StatePlugin: unexpected exception during plugin registration')
      logger.error(err)
      logger.error('StatePlugin: exiting process')
      process.exit(1)
    }
  }
}
