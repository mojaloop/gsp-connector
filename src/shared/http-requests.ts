import { Logger as SDKLogger, RequestOptions, request, requests } from '@mojaloop/sdk-standard-components'
import { PrependFun, Scheme, prepend2Uri } from '../shared/http-scheme'
import { throwOrExtractData } from '../shared/throw-or-extract-data'
import http from 'http'

export interface HttpRequestsConfig {
  logger: SDKLogger.Logger

  // type of http scheme
  scheme: Scheme

  // target uri for all requests
  uri: string

  // should we keep alive connection with backend,
  // default 'true' if not specified
  keepAlive?: boolean
}

/**
 * @class HttpRequest
 * @description tiny wrapper dedicated to make requests with proper logging
 */
export class HttpRequests {
  // request config
  protected _config: HttpRequestsConfig

  // the http agent to make requests
  protected agent: http.Agent

  constructor(config: HttpRequestsConfig) {
    this._config = config
    this.agent = new http.Agent({
      keepAlive: typeof config.keepAlive === 'undefined' ? true : config.keepAlive
    })
  }

  // GETTERS

  // config getter
  // to allow polymorphic properties in derived classes later
  protected get config(): HttpRequestsConfig {
    return this._config
  }

  // get sdk logger
  protected get logger(): SDKLogger.Logger {
    return this.config.logger
  }

  // generates minimal set of headers for request
  protected get headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Date: new Date().toUTCString()
    }
  }

  // getter used to implement dynamic protected method
  // which is used to generate fullUri
  protected get prependScheme(): PrependFun {
    return prepend2Uri(this.config.scheme)
  }

  // METHODS

  // build full URI pointing to backend endpoint using config.uri and config.scheme
  get endpoint(): string {
    return this.prependScheme(this.config.uri)
  }

  // generates the full uri from given path
  fullUri(path: string): string {
    return `${this.endpoint}/${path}`
  }

  // request with proper logging
  // extracts data from response
  // throws HTTPResponseError exception if received response has non-successful statusCode
  async loggedRequest<Response>(opts: RequestOptions): Promise<Response | void> {
    const optsWithDefaults = {
      headers: this.headers,
      ...opts
    }
    try {
      this.logger.push({ optsWithDefaults }).info(`Executing ${this.config.scheme} ${opts.method} request`)
      const res = await request<Response>(optsWithDefaults)
      return throwOrExtractData<Response>(res)
    } catch (err) {
      this.logger
        .push({ err })
        .error(`Error attempting ${this.config.scheme} ${optsWithDefaults.method} ${optsWithDefaults.uri}`)
      throw err
    }
  }

  // HTTP methods helpers to stringify
  // GET
  async get<Response>(path: string): Promise<Response | void> {
    return this.loggedRequest({
      uri: this.fullUri(path),
      agent: this.agent,
      method: 'GET'
    })
  }

  // PATCH
  async patch<Body, Response>(path: string, body: Body): Promise<Response | void> {
    return this.loggedRequest({
      uri: this.fullUri(path),
      agent: this.agent,
      method: 'PATCH',
      body: requests.common.bodyStringifier(body)
    })
  }

  // POST
  async post<Body, Response>(path: string, body: Body): Promise<Response | void> {
    return this.loggedRequest({
      uri: this.fullUri(path),
      agent: this.agent,
      method: 'POST',
      body: requests.common.bodyStringifier(body)
    })
  }

  // PUT
  async put<Body, Response>(path: string, body: Body): Promise<Response | void> {
    return this.loggedRequest({
      uri: this.fullUri(path),
      agent: this.agent,
      method: 'PUT',
      body: requests.common.bodyStringifier(body)
    })
  }
}
