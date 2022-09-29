import { Request, ResponseObject } from '@hapi/hapi'
import { StateResponseToolkit } from '../../server/plugins/state'
import { PACKAGE } from '../../shared/config'
import { HealthCheck } from '@mojaloop/central-services-shared'

const healthCheck = new HealthCheck.HealthCheck(PACKAGE, [])

/**
 * Operations on /health
 */

/**
 * summary: Get Server
 * description: The HTTP request GET /health is used to return the current status of the API.
 * parameters:
 * produces: application/json
 * responses: 200, 400, 401, 403, 404, 405, 406, 501, 503
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = async (_context: unknown, _request: Request, h: StateResponseToolkit): Promise<ResponseObject> => {
  const response = await healthCheck.getHealth()
  response.LoggerPresent = typeof h.getLogger() !== 'undefined'
  return h.response(response).code(200)
}

export default {
  get
}
