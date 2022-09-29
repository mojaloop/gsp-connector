import { RequestResponse } from '@mojaloop/sdk-standard-components'
import { HTTPResponseError, ResponseErrorData } from './http-response-error'

export function throwOrExtractData<Data>(res: RequestResponse<Data>): Data | void {
  // TODO: will a 503 or 500 with content-length zero generate an error?
  // or a 404 for that matter?!

  if ((res.headers && res.headers['content-length'] === '0') || res.statusCode === 204) {
    // success but no content, return null
    return
  }

  // transform non-successful statusCodes into exception
  if (res.statusCode < 200 || res.statusCode >= 300) {
    // not a successful request
    throw new HTTPResponseError({
      msg: `Request returned non-success status code ${res.statusCode}`,
      res
    } as unknown as ResponseErrorData)
  }

  return res.data
}
