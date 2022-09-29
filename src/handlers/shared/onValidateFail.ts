import { Lifecycle, Request, ResponseToolkit } from '@hapi/hapi'
import { boomify } from '@hapi/boom'

export default function onValidateFail(
  _request: Request,
  _h: ResponseToolkit,
  err?: Error | undefined
): Lifecycle.ReturnValue {
  throw boomify(err as Error)
}
