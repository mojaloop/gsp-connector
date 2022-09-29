import { Request, ResponseObject } from '@hapi/hapi'
import axios from 'axios';
import { StateResponseToolkit } from '../server/plugins/state'
// TODO: figure out why this is not working?
// import { thirdpartySdk, gsp } from '@project-interfaces';
import { thirdpartySdk, gsp } from '../interface/types';

async function post(_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject>  {
  const transferFundsRequest = _request.payload //as gsp.components['schemas']['transferFundsRequest'];
  console.log('transferFundsRequest:')
  console.dir(transferFundsRequest);

  // TODO: Map transferFundsRequest request values to approve request
  // Make POST /thirdpartyTransactions/{transactionRequestId}/approve to config.shared.thirdpartySdkEndpoint

  // POST /thirdpartyTransactions/{transactionRequestId}/approve

  // {
  //   authorizationResponse: {
  //       responseType: 'ACCEPTED',
  //       signedPayload: {
  //         signedPayloadType: 'FIDO',
  //         fidoSignedPayload: {
  //           id: TransferFundsRequest.challengeResults[0].fidoAssertion.id,
  //           rawId: TransferFundsRequest.challengeResults[0].fidoAssertion.rawId,
  //           response: {
  //             authenticatorData: TransferFundsRequest.challengeResults[0].fidoAssertion.response.authenticatorData,
  //             clientDataJSON: TransferFundsRequest.challengeResults[0].fidoAssertion.response.clientDataJSON,
  //             signature: TransferFundsRequest.challengeResults[0].fidoAssertion.response.signature,
  //             // What is userHandle in FIDO? Ignore for demo.
  //           },
  //           type: 'public-key'
  //         }
  //       }
  //     }
  // };

  // Response
  // {
  //   "transactionStatus": {,
  //     "transactionRequestState": "ACCEPTED",
  //     "transactionState": "COMPLETED",
  //   },",
  //   "currentState": "transactionStatusReceived",
  // }
  // Core connector takes approve response and responds to PISP's transferFunds request.

  // POST /v3/transferFundsRequest Response
  // {
  //   "responseHeader": {
  //     "responseTimestamp": {
  //       "epochMillis": Date.now()
  //     }
  //   },
  //   "result": approveResponse.transactionRequestState == "ACCEPTED" && approveResponse.transactionState == "COMPLETED" ? {"success": {}} : {"creditStatusUnknown": {}},
  //   "paymentIntegratorTransactionId": "approveResponse.transactionStatus.transactionRequestId"
  // }

  return h.response('TO BE DONE').code(200)
}

export default {
  post
}
