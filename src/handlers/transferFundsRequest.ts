import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../server/plugins/state'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  // TODO: Map transferFundsRequest request values to approve request
  // Make POST /thirdpartyTransactions/{transactionRequestId}/approve to config.shared.thirdpartySdkEndpoint
  return h.response().code(200)
}

export default {
  post
}
