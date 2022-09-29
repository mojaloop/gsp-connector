import getTransferFundsQuotationRequest from './getTransferFundsQuotationRequest'
import transferFundsRequest from './transferFundsRequest'
import getPayeeProxyDisplayInfo from './getPayeeProxyDisplayInfo'

export default {
  GetQuotation: getTransferFundsQuotationRequest.post,
  TransferFunds: transferFundsRequest.post,
  GetPayeeProxyDisplayInfo: getPayeeProxyDisplayInfo.post,
}
