import { logger } from '../shared/logger'
import { PACKAGE } from '../shared/config'
import { Server } from '@hapi/hapi'

export async function start(server: Server): Promise<Server> {
  await server.start()
  logger.info(`Service '${PACKAGE.name}' is running @ ${server.info.uri}`)
  return server
}

export async function stop(server: Server): Promise<void> {
  await server.stop()
}
