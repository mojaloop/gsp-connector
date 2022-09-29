// getPayeeProxyDisplayInfo

import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../server/plugins/state'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  // TODO: Map GetPayeeProxyDisplayInfo request values to approve request
  // UPDATE: NOTE NEEDED SINCE WE RE-ADDED THE PayeeProxyInfo back into the getTransferFundsQuotationResponse
  // Make POST /GetPayeeProxyDisplayInfo
  return h.response('TO BE DONE').code(200)
}

export default {
  post
}
