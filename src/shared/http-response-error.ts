import inspect from '../shared/inspect'

export interface ResponseErrorData {
  msg: string
  res?: {
    body?: string
    data?: { [key: string]: unknown }
  }
}

export class HTTPResponseError<ErrorData extends ResponseErrorData> extends Error {
  protected errorData: ErrorData

  constructor(params: ErrorData) {
    super(params.msg)
    this.errorData = params
  }

  getData(): ErrorData {
    return this.errorData
  }

  toString(): string {
    return inspect(this.errorData)
  }

  toJSON(): string {
    return JSON.stringify(this.errorData)
  }
}
