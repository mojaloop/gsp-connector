import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi'
import Metrics from '@mojaloop/central-services-metrics'

async function get(_context: unknown, _request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  const metrics = await Metrics.getMetricsForPrometheus()
  return h.response(metrics).code(200)
}

export default {
  get
}
