import { Server } from '@hapi/hapi'
import onPreHandler from '../handlers/shared/onPreHandler'

async function register(server: Server): Promise<Server> {
  await server.ext([
    {
      type: 'onPreHandler',
      method: onPreHandler
    }
  ])
  return server
}

export default {
  register
}
