import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../server/plugins/state'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  return h.response().code(200)
}

export default {
  post
}
