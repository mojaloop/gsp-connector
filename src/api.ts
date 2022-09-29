import config, { ServiceConfig } from './shared/config'
import { ServerConfig } from './server'
import { Handler } from 'openapi-backend'
import Handlers from './handlers'
import index from './index'
import path from 'path'
import { Server as HapiServer } from '@hapi/hapi'

import { Logger as SDKLogger } from '@mojaloop/sdk-standard-components'
import _ from 'lodash'
import { stop } from './server/start'

/**
 * prepares commander action
 * @param handlers { { [handler: string]: Handler } } dictionary with api handlers, will be joined with Handlers.Shared
 * @param serviceConfig {ServiceConfig} dictionary with config options. see `src/shared/config` for interface
 * @returns () => Promise<void> asynchronous commander action to start api
 */
export async function mkStartAPI(
  handlers: { [handler: string]: Handler },
  serviceConfig: ServiceConfig = config
): Promise<HapiServer> {
  // resolve the path to openapi v3 definition file
  const apiPath = path.resolve(__dirname, `../src/interface/gsp-api-v3draft-sep29.yaml`)

  // prepare API handlers
  const joinedHandlers = {
    ...handlers
  }

  const serverConfig: ServerConfig = {
    port: serviceConfig.port,
    host: serviceConfig.host,
    serviceConfig: serviceConfig
  }
  // setup & start @hapi server
  return await index.server.setupAndStart(serverConfig, apiPath, joinedHandlers)
}

export class Server {
  private conf!: ServiceConfig
  public logger!: SDKLogger.Logger
  public server!: HapiServer

  async initialize(conf: ServiceConfig): Promise<void> {
    this.conf = conf
    this.logger = new SDKLogger.Logger()

    this.server = await mkStartAPI(Handlers, conf)
    await Promise.all([this.server])
  }

  static async create(conf: ServiceConfig): Promise<Server> {
    const server = new Server()
    await server.initialize(conf)
    return server
  }

  async stop() {
    return Promise.all([stop(this.server)])
  }
}

export function startAPISuite() {
  return async (): Promise<void> => {
    const logger = new SDKLogger.Logger()
    const svr = await Server.create(config)

    // handle SIGTERM to exit gracefully
    process.on('SIGTERM', async () => {
      logger.log('SIGTERM received. Shutting down APIs...')
      await svr.stop()
      process.exit(0)
    })
  }
}
