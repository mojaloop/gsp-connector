import Convict from 'convict'
import PACKAGE from '../../package.json'
import path from 'path'

export { PACKAGE }

// interface to represent service configuration
export interface ServiceConfig {
  env: string
  requestProcessingTimeoutSeconds: number
  host: string,
  port: number,
  inspect: {
    depth: number
    showHidden: boolean
    color: boolean
  }
  shared: {
    thirdpartySdkEndpoint: string
  }
}

// Declare configuration schema, default values and bindings to environment variables
export const ConvictConfig = Convict<ServiceConfig>({
  env: {
    doc: 'The application environment.',
    format: ['default', 'production', 'development', 'test', 'integration', 'e2e'],
    default: 'default',
    env: 'NODE_ENV'
  },
  host: {
    doc: 'The Hostname/IP address to bind.',
    format: '*',
    default: '0.0.0.0',
    env: 'HOST'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  requestProcessingTimeoutSeconds: {
    doc: 'The timeout for waiting for a response to a request',
    env: 'REQUEST_PROCESSING_TIMEOUT_SECONDS',
    default: 30
  },
  inspect: {
    depth: {
      doc: 'Inspection depth',
      format: 'nat',
      env: 'INSPECT_DEPTH',
      default: 4
    },
    showHidden: {
      doc: 'Show hidden properties',
      format: 'Boolean',
      default: false
    },
    color: {
      doc: 'Show colors in output',
      format: 'Boolean',
      default: true
    }
  },
  shared: {
    thirdpartySdkEndpoint: {
      doc: 'Peer/Switch endpoint',
      format: '*',
      default: '0.0.0.0:4006',
      env: 'THIRDPARTY_SDK_ENDPOINT'
    }
  }
})

// Load environment dependent configuration
const env = ConvictConfig.get('env')
ConvictConfig.loadFile(path.join(__dirname, `/../../config/${env}.json`))

// Perform configuration validation
ConvictConfig.validate({ allowed: 'strict' })

// extract simplified config from Convict object
const config: ServiceConfig = {
  env: ConvictConfig.get('env'),
  host: ConvictConfig.get('host'),
  port: ConvictConfig.get('port'),
  requestProcessingTimeoutSeconds: ConvictConfig.get('requestProcessingTimeoutSeconds'),
  inspect: ConvictConfig.get('inspect'),
  shared: ConvictConfig.get('shared'),
}

export default config
