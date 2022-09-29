// getPayeeProxyDisplayInfo

import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../server/plugins/state'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  // TODO: Map GetPayeeProxyDisplayInfo request values to approve request
  // Make POST /GetPayeeProxyDisplayInfo
  return h.response('TO BE DONE').code(200)
}

export default {
  post
}
