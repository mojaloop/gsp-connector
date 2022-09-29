import { Server, ServerRegisterPluginObject } from '@hapi/hapi'
import { Handler } from 'openapi-backend'
import { Util } from '@mojaloop/central-services-shared'

const OpenapiBackend = Util.OpenapiBackend

async function initialize(
  apiPath: string,
  handlers: { [handler: string]: Handler }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<ServerRegisterPluginObject<any>> {
  return {
    plugin: {
      name: 'openapi',
      version: '1.0.0',
      multiple: true,
      register: function (server: Server, options: { [index: string]: string | Record<string, unknown> }): void {
        server.expose('openapi', options.openapi)
      }
    },
    options: {
      openapi: await OpenapiBackend.initialise(apiPath, handlers)
    }
  }
}

export default {
  initialize
}
