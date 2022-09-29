import create, { ServerConfig } from './create'
import { Handler } from 'openapi-backend'
import { Server } from '@hapi/hapi'
import extensions from './extensions'
import plugins from './plugins'
import { start } from './start'

export async function setupAndStart(
  config: ServerConfig,
  apiPath: string,
  handlers: { [handler: string]: Handler }
): Promise<Server> {
  const server = await create(config)
  await plugins.register(server, apiPath, handlers)
  await extensions.register(server)
  await start(server)
  return server
}
