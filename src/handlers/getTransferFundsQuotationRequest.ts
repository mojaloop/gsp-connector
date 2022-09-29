import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios';
import ErrorHandler from '@mojaloop/central-services-error-handling'
import { StateResponseToolkit } from '../server/plugins/state'
import { thirdpartySdk, gsp } from '@project-interfaces';
// TODO: figure out why this is not working?
// import { GspTransformer } from '@project-shared';
import { GspTransformer } from '../shared';

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {

  const getTransferFundsQuotationRequest = _request.payload as gsp.components['schemas']['GetTransferFundsQuotationRequest'];

  // Make POST /thirdpartyTransaction/partyLookup to config.shared.thirdpartySdkEndpoint

  const thirdpartyTransactionPartyLookupRequest: thirdpartySdk.components['schemas']['ThirdpartyTransactionPartyLookupRequest'] = {
    transactionRequestId: GspTransformer.toUUID(getTransferFundsQuotationRequest.associationId as string), //TODO: convert_to_uuid(getTransferFundsQuotationRequest.associationId) || uuidv5(getTransferFundsQuotationRequest.associationId, config.namespace);,
    payee: {
      partyIdType: 'MSISDN',
      partyIdentifier: getTransferFundsQuotationRequest.payeeProxy?.payeeProxyKey?.phoneNumber as string
    }
  }

  console.dir(thirdpartyTransactionPartyLookupRequest);

  const thirdpartyTransactionPartyLookupResponse = await axios.post<thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseSuccess"] | thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseError"]>(
    'https://reqres.in/api/users',
    thirdpartyTransactionPartyLookupRequest,
    { // config
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  // const thirdpartyTransactionPartyLookupResponse = thirdpartyTransactionPartyLookupAxiosResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseSuccess"]

  console.dir(thirdpartyTransactionPartyLookupResponse?.data)
  
  if (thirdpartyTransactionPartyLookupResponse.data?.currentState === 'partyLookupFailure' || thirdpartyTransactionPartyLookupResponse.data?.currentState === 'errored'){
    const errorInformation = thirdpartyTransactionPartyLookupResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseError"]
    // @ts-expect-error: TODO fix types for missing definitions
    const fspiopError = ErrorHandler.Factory.reformatFSPIOPError(errorInformation)
    throw fspiopError;
  }

  const payeeParty = (thirdpartyTransactionPartyLookupResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseSuccess"]).party as  thirdpartySdk.components["schemas"]["Party"]

  const thirdpartyTransactionsWithTransactionRequestIdInitiateRequest: thirdpartySdk.components['schemas']['ThirdpartyTransactionIDInitiateRequest'] = {
    payee: {
      ... payeeParty
    },
    payer: {
      partyIdType: 'THIRD_PARTY_LINK',
      partyIdentifier: getTransferFundsQuotationRequest.googlePaymentToken?.token as string,
      fspId: undefined
    },
    amountType: 'SEND',
    amount: {
      currency: getTransferFundsQuotationRequest.amount?.currencyCode as thirdpartySdk.components["schemas"]["Currency"],
      amount: GspTransformer.toFspiopCurrency(getTransferFundsQuotationRequest.amount?.amountMicros as string),
    },
    transactionType: {
      scenario: 'TRANSFER',
      initiator: 'PAYER',
      initiatorType: 'CONSUMER'
    },
    expiration: (new Date(Date.now())).toISOString() // TODO: + config.expirationTimeout)
  }

  console.dir(thirdpartyTransactionsWithTransactionRequestIdInitiateRequest)
  // TODO: Map getTransferFundsQuotationRequest request and party look up response values to initiate lookup request
  // Make POST /thirdpartyTransactions/{transactionRequestId}/initiate to config.shared.thirdpartySdkEndpoint

  // RESPONSE fpr getTransferFundsQuotation
  // {
  //   "responseHeader": {
  //     "responseTimestamp": {
  //       "epochMillis": new Date.now()
  //     }
  //   },
  //   "result": {
  //     "success": {
  //       "feeAmount": {
  //         "amountMicros": convert_to_amount_micros(initiateResponse.authorization.fees.amount),
  //         "currencyCode": initiateResponse.body.authorization.fees.currency
  //       },
  //       // Assuming this is to support multiple authentication methods.
  //       // Running with the assumption that Mojaloop will provide a singular FIDO assertion.
  //       "challengeOptions": [
  //         {
  //           // challengeOptionId is used in the GSP transferFunds call.
  //           // Assuming to identify which authentication method was chosen.
  //           // We can have the GSP connector generate this
  //           "challengeOptionId": "xxxxxxxxxxxxxxx" || uuid(),
  //           "fido": {
  //             "challenge": initiateResponse.body.authorization.challenge,
  //             "allowCredentials": [
  //               // Assuming this is if google wants to only allow specific devices
  //               // to sign this challenge since they have multi-device support.
  //               // Mojaloop has no such requirement so we can probably put a mock string here.
  //               {
  //                 "type": "public-key",
  //                 "id": "xxxxxxxxxxxxxxxxx"
  //               }
  //             ]
  //           }
  //         }
  //       ]
  //     }
  //   }
  // }

  return h.response('TO BE DONE').code(200)
}

export default {
  post
}
