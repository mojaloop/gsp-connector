import getTransferFundsQuotationRequest from './getTransferFundsQuotationRequest'
import transferFundsRequest from './transferFundsRequest'

export default {
  GetQuotation: getTransferFundsQuotationRequest.post,
  TransferFunds: transferFundsRequest.post,
}
