import Health from './health'
import Metrics from './metrics'
import { Util } from '@mojaloop/central-services-shared'
const OpenapiBackend = Util.OpenapiBackend

export default {
  HealthGet: Health.get,
  MetricsGet: Metrics.get,
  validationFail: OpenapiBackend.validationFail,
  notFound: OpenapiBackend.notFound,
  methodNotAllowed: OpenapiBackend.methodNotAllowed
}
