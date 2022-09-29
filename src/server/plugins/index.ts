import { Server, ServerRoute } from '@hapi/hapi'
import Blip from 'blipp'
import ErrorHandling from '@mojaloop/central-services-error-handling'
import Good from './good'
import { Handler } from 'openapi-backend'
import Inert from '@hapi/inert'
import OpenAPI from './openAPI'
import { StatePlugin } from './state'
import { Util } from '@mojaloop/central-services-shared'
import Vision from '@hapi/vision'

async function register(server: Server, apiPath: string, handlers: { [handler: string]: Handler }): Promise<Server> {
  const openapiBackend = await OpenAPI.initialize(apiPath, handlers)

  let plugins = [
    StatePlugin,
    Util.Hapi.OpenapiBackendValidator,
    Good,
    openapiBackend,
    Inert,
    Vision,
    Blip,
    ErrorHandling
  ]

  // filter out any null values
  plugins = plugins.filter(function (e) {
    return e != null
  })

  await server.register(plugins)

  // use as a catch-all handler
  server.route({
    method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    path: '/{path*}',
    handler: (req, h): ServerRoute =>
      openapiBackend.options.openapi.handleRequest(
        {
          method: req.method,
          path: req.path,
          body: req.payload,
          query: req.query,
          headers: req.headers
        },
        req,
        h
      )
  })

  return server
}

export default {
  register
}
