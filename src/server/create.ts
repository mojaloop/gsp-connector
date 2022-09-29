import { Server } from '@hapi/hapi'
import onValidateFail from '../handlers/shared/onValidateFail'
import { validateRoutes } from '@mojaloop/central-services-error-handling'
import { ServiceConfig } from '../shared/config'

// minimal server configuration
export interface ServerConfig {
  host: string
  port: number
  serviceConfig: ServiceConfig
}
// server app interface accessible in handlers and plugins via settings.app[key]
export interface ServerApp {
  serviceConfig: ServiceConfig
}

export default async function create(config: ServerConfig): Promise<Server> {
  const server: Server = new Server({
    host: config.host,
    port: config.port,
    routes: {
      validate: {
        options: validateRoutes(),
        failAction: onValidateFail
      }
    },
    app: {
      serviceConfig: config.serviceConfig
    },
  })
  return server
}
