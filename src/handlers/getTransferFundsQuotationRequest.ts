import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios';
import { randomUUID } from "crypto";
import ErrorHandler from '@mojaloop/central-services-error-handling'
import { StateResponseToolkit } from '../server/plugins/state'
// TODO: figure out why this is not working?
// import { thirdpartySdk, gsp } from '@project-interfaces';
import { thirdpartySdk, gsp } from '../interface/types';
// TODO: figure out why this is not working?
// import { GspTransformer } from '@project-shared';
import { GspTransformer } from '../shared';

import config from '../shared/config'

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

  const thirdpartyTransactionPartyLookupUrl = `${config.shared.thirdpartySdkEndpoint}/thirdpartyTransaction/partyLookup`
  const thirdpartyTransactionPartyLookupResponse = await axios.post<thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseSuccess"] | thirdpartySdk.components["schemas"]["ThirdpartyTransactionPartyLookupResponseError"]>(
    thirdpartyTransactionPartyLookupUrl,
    thirdpartyTransactionPartyLookupRequest,
    { // config
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

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
    expiration: (new Date(Date.now() + 1000)).toISOString() // TODO: + config.expirationTimeout)
  }

  console.dir(thirdpartyTransactionsWithTransactionRequestIdInitiateRequest)
  // TODO: Map getTransferFundsQuotationRequest request and party look up response values to initiate lookup request
  // Make POST /thirdpartyTransactions/{transactionRequestId}/initiate to config.shared.thirdpartySdkEndpoint

  const thirdpartyTransactionsWithTransactionRequestIdInitiateUrl = `${config.shared.thirdpartySdkEndpoint}/thirdpartyTransaction/b51ec534-ee48-4575-b6a9-ead2955b8069/initiate`
  const thirdpartyTransactionsWithTransactionRequestIdInitiateResponse = await axios.post<thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDInitiateResponseSuccess"] | thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDInitiateResponseError"]>(
    thirdpartyTransactionsWithTransactionRequestIdInitiateUrl,
    thirdpartyTransactionsWithTransactionRequestIdInitiateRequest,
    { // config
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  console.dir(thirdpartyTransactionsWithTransactionRequestIdInitiateResponse?.data)

  if (thirdpartyTransactionsWithTransactionRequestIdInitiateResponse.data?.currentState === 'errored'){
    const errorInformation = thirdpartyTransactionsWithTransactionRequestIdInitiateResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDInitiateResponseError"]
    // @ts-expect-error: TODO fix types for missing definitions
    const fspiopError = ErrorHandler.Factory.reformatFSPIOPError(errorInformation)
    throw fspiopError;
  }

  const initiateResponse = thirdpartyTransactionsWithTransactionRequestIdInitiateResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDInitiateResponseSuccess"]

  const response: gsp.components['schemas']['GetTransferFundsQuotationResponse'] = {
    "responseHeader": {
      "responseTimestamp": {
        "epochMillis": Date.now().toString()
      }
    },
    "result": {
      "success": {
        "payeeProxyLookup" : {
          "displayInfo": {
            "displayName": payeeParty.name
          }
        },
        "feeAmount": {
          "amountMicros": GspTransformer.toAmountMicrosFromFspiop(initiateResponse.authorization.fees.amount),
          "currencyCode": initiateResponse.authorization.fees.currency
        },
        // Assuming this is to support multiple authentication methods.
        // Running with the assumption that Mojaloop will provide a singular FIDO assertion.
        "challengeOptions": {
          // challengeOptionId is used in the GSP transferFunds call.
          // Assuming to identify which authentication method was chosen.
          // We can have the GSP connector generate this
          "challengeOptionId": randomUUID(),
          "fido": {
            "challenge": initiateResponse.authorization.challenge,
            "allowCredentials":
            // Assuming this is if google wants to only allow specific devices
            // to sign this challenge since they have multi-device support.
            // Mojaloop has no such requirement so we can probably put a mock string here.
            {
              "type": "public-key",
              "id": "xxxxxxxxxxxxxxxxx"
            }
          }
        }
      }
    }
  }

  return h.response(response).code(200)
}

export default {
  post
}
