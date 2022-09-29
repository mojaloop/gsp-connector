import { Request, ResponseToolkit } from '@hapi/hapi'
import { RequestLogged, logResponse } from '../../shared/logger'

export default async function onPreHandler(request: Request, h: ResponseToolkit): Promise<symbol> {
  logResponse(request as RequestLogged)
  return h.continue
}
