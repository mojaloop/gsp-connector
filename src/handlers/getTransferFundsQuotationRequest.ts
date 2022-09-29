import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../server/plugins/state'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  // TODO: Map getTransferFundsQuotationRequest request values to party lookup request
  // Make POST /thirdpartyTransaction/partyLookup to config.shared.thirdpartySdkEndpoint

  // TODO: Map getTransferFundsQuotationRequest request and party look up response values to initiate lookup request
  // Make POST /thirdpartyTransactions/{transactionRequestId}/initiate to config.shared.thirdpartySdkEndpoint

  return h.response().code(200)
}

export default {
  post
}
