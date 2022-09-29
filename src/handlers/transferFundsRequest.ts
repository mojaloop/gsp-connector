import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios';
import { StateResponseToolkit } from '../server/plugins/state'
// TODO: figure out why this is not working?
// import { thirdpartySdk, gsp } from '@project-interfaces';
import { thirdpartySdk, gsp } from '../interface/types';

import config from '../shared/config'

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  const transferFundsRequest = _request.payload as gsp.components["schemas"]["TransferFundsRequest"]
  console.log('transferFundsRequest:')
  console.dir(transferFundsRequest);

  // Make POST /thirdpartyTransactions/{transactionRequestId}/approve to config.shared.thirdpartySdkEndpoint

  const thirdpartyTransactionIDApproveRequest: thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDApproveRequest"] = {
    authorizationResponse: {
      responseType: 'ACCEPTED',
      signedPayload: {
        signedPayloadType: "FIDO",
        fidoSignedPayload: {
          id: "45c-TkfkjQovQeAWmOy-RLBHEJ_e4jYzQYgD8VdbkePgM5d98BaAadadNYrknxgH0jQEON8zBydLgh1EqoC9DA",
          rawId: "45c+TkfkjQovQeAWmOy+RLBHEJ/e4jYzQYgD8VdbkePgM5d98BaAadadNYrknxgH0jQEON8zBydLgh1EqoC9DA==",
          response: {
            authenticatorData: "SZYN5YgOjGh0NBcPZHZgW4/krrmihjLHmVzzuoMdl2MBAAAACA==",
            clientDataJSON:
              "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiQUFBQUFBQUFBQUFBQUFBQUFBRUNBdyIsIm9yaWdpbiI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIxODEiLCJjcm9zc09yaWdpbiI6ZmFsc2UsIm90aGVyX2tleXNfY2FuX2JlX2FkZGVkX2hlcmUiOiJkbyBub3QgY29tcGFyZSBjbGllbnREYXRhSlNPTiBhZ2FpbnN0IGEgdGVtcGxhdGUuIFNlZSBodHRwczovL2dvby5nbC95YWJQZXgifQ==",
            signature:
              "MEUCIDcJRBu5aOLJVc/sPyECmYi23w8xF35n3RNhyUNVwQ2nAiEA+Lnd8dBn06OKkEgAq00BVbmH87ybQHfXlf1Y4RJqwQ8="
          },
          type: "public-key"
        }
      }
    }
  }

  console.log('thirdpartyTransactionIDApproveRequest:')
  console.dir(thirdpartyTransactionIDApproveRequest);

  const transactionRequestId = transferFundsRequest.challengeResults?.challengeOptionId //'b51ec534-ee48-4575-b6a9-ead2955b8069' // TODO: How do we get this from the thirdpartyTransactionsWithTransactionRequestIdInitiateRequest?
  const thirdpartyTransactionPartyLookupUrl = `${config.shared.thirdpartySdkEndpoint}/thirdpartyTransaction/${transactionRequestId}/approve`
  const thirdpartyTransactionIDApproveResponse = await axios.post<thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDApproveResponseSuccess"] | thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDApproveResponseError"]>(
    thirdpartyTransactionPartyLookupUrl,
    thirdpartyTransactionIDApproveRequest,
    { // config
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }
  )

  console.log('thirdpartyTransactionIDApproveResponse:')
  console.dir(thirdpartyTransactionIDApproveResponse?.data);

  if (thirdpartyTransactionIDApproveResponse.data?.currentState === 'errored'){
    const errorInformation = thirdpartyTransactionIDApproveResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDApproveResponseError"]
    // @ts-expect-error: TODO fix types for missing definitions
    const fspiopError = ErrorHandler.Factory.reformatFSPIOPError(errorInformation)
    throw fspiopError;
  }

  const approveResponse = thirdpartyTransactionIDApproveResponse.data as thirdpartySdk.components["schemas"]["ThirdpartyTransactionIDApproveResponseSuccess"]

  const transferFundsResponse: gsp.components["schemas"]["TransferFundsResponse"] = {
    "responseHeader": {
      "responseTimestamp": {
        "epochMillis": Date.now().toString()
      }
    },
    "result": {
      "success": {} // TODO: Handle failure cases
    },
    "paymentIntegratorTransactionId": approveResponse.transactionStatus.transactionRequestId
  }

  return h.response(transferFundsResponse).code(200)
}

export default {
  post
}
