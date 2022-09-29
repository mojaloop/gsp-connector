import { Request, ResponseObject } from '@hapi/hapi'
import inspect from './inspect'
import { Logger as SDKLogger } from '@mojaloop/sdk-standard-components'

// default SDKLogger instance
export const logger = new SDKLogger.Logger()
export function createLogger(params?: SDKLogger.LoggerConstructorParams): SDKLogger.Logger {
  return new SDKLogger.Logger(params)
}

export interface ResponseLogged extends ResponseObject {
  source: string
  statusCode: number
}
export interface RequestLogged extends Request {
  response: ResponseLogged
}

export function logResponse(request: RequestLogged): void {
  if (request && request.response) {
    let response
    try {
      response = JSON.stringify(request.response.source)
    } catch (e) {
      response = inspect(request.response.source)
    }
    if (!response) {
      logger.info(`AS-Trace - Response: ${request.response}`)
    } else {
      logger.info(`AS-Trace - Response: ${response} Status: ${request.response.statusCode}`)
    }
  }
}
