// for mojaloop there is lack for @types files
// to stop typescript complains, we have to declare some modules here

declare module '@mojaloop/central-services-error-handling'{
  export function validateRoutes(options?: Record<string, unknown>): Record<string, unknown>
  interface APIError {
    errorInformation: {
      errorCode: string | number;
      errorDescription: string;
    };
  }
  class FSPIOPError {
    public toString(): string;
    public toApiErrorRecord(options: { includeCauseExtension?: boolean; truncateExtensions?: boolean }): APIError
  }
  interface FactoryI {
    createFSPIOPErrorFromOpenapiError(error: any, replyTo?: any): FSPIOPError;
  }
  export const Factory: FactoryI
  interface FSPIOPErrorCode {
    code: string;
    message: string;
  }
  const Enums: {
    FSPIOPErrorCodes: {
      // Generic communication errors
      COMMUNICATION_ERROR: FSPIOPErrorCode;
      DESTINATION_COMMUNICATION_ERROR: FSPIOPErrorCode;

      // Generic server errors
      SERVER_ERROR: FSPIOPErrorCode; // { code: '2000', message: 'Generic server error' },
      INTERNAL_SERVER_ERROR: FSPIOPErrorCode; // { code: '2001', message: 'Internal server error' },
      NOT_IMPLEMENTED: FSPIOPErrorCode; // { code: '2002', message: 'Not implemented' , httpStatusCode: 501},
      SERVICE_CURRENTLY_UNAVAILABLE: FSPIOPErrorCode; // { code: '2003', message: 'Service currently unavailable', httpStatusCode: 503 },
      SERVER_TIMED_OUT: FSPIOPErrorCode; // { code: '2004', message: 'Server timed out' },
      SERVER_BUSY: FSPIOPErrorCode; // { code: '2005', message: 'Server busy' },

      // Generic client errors
      METHOD_NOT_ALLOWED: FSPIOPErrorCode; // code: '3000', message: 'Generic client error - Method Not Allowed', httpStatusCode: 405 },
      CLIENT_ERROR: FSPIOPErrorCode; // code: '3000', message: 'Generic client error', httpStatusCode: 400 },
      UNACCEPTABLE_VERSION: FSPIOPErrorCode; // code: '3001', message: 'Unacceptable version requested', httpStatusCode: 406 },
      UNKNOWN_URI: FSPIOPErrorCode; // code: '3002', message: 'Unknown URI', httpStatusCode: 404 },
      ADD_PARTY_INFO_ERROR: FSPIOPErrorCode; // code: '3003', message: 'Add Party information error' },
      DELETE_PARTY_INFO_ERROR: FSPIOPErrorCode; // code: '3040', message: 'Delete Party information error' }, // Error code thrown in ALS when deleting participant info fails

      // Client validation errors
      VALIDATION_ERROR: FSPIOPErrorCode; // code: '3100', message: 'Generic validation error', httpStatusCode: 400 },
      MALFORMED_SYNTAX: FSPIOPErrorCode; // code: '3101', message: 'Malformed syntax', httpStatusCode: 400 },
      MISSING_ELEMENT: FSPIOPErrorCode; // code: '3102', message: 'Missing mandatory element', httpStatusCode: 400 },
      TOO_MANY_ELEMENTS: FSPIOPErrorCode; // code: '3103', message: 'Too many elements', httpStatusCode: 400 },
      TOO_LARGE_PAYLOAD: FSPIOPErrorCode; // code: '3104', message: 'Too large payload', httpStatusCode: 400 },
      INVALID_SIGNATURE: FSPIOPErrorCode; // code: '3105', message: 'Invalid signature', httpStatusCode: 400 },
      MODIFIED_REQUEST: FSPIOPErrorCode; // code: '3106', message: 'Modified request', httpStatusCode: 400 },
      MISSING_MANDATORY_EXTENSION: FSPIOPErrorCode; // code: '3107', message: 'Missing mandatory extension parameter', httpStatusCode: 400 },

      // identifier errors
      ID_NOT_FOUND: FSPIOPErrorCode; // code: '3200', message: 'Generic ID not found' },
      DESTINATION_FSP_ERROR: FSPIOPErrorCode; // code: '3201', message: 'Destination FSP Error' },
      PAYER_FSP_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3202', message: 'Payer FSP ID not found' },
      PAYEE_FSP_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3203', message: 'Payee FSP ID not found' },
      PARTY_NOT_FOUND: FSPIOPErrorCode; // code: '3204', message: 'Party not found' },
      QUOTE_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3205', message: 'Quote ID not found' },
      TXN_REQUEST_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3206', message: 'Transaction request ID not found' },
      TXN_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3207', message: 'Transaction ID not found' },
      TRANSFER_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3208', message: 'Transfer ID not found' },
      BULK_QUOTE_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3209', message: 'Bulk quote ID not found' },
      BULK_TRANSFER_ID_NOT_FOUND: FSPIOPErrorCode; // code: '3210', message: 'Bulk transfer ID not found' },

      // expired errors
      EXPIRED_ERROR: FSPIOPErrorCode; // code: '3300', message: 'Generic expired error' },
      TXN_REQUEST_EXPIRED: FSPIOPErrorCode; // code: '3301', message: 'Transaction request expired' },
      QUOTE_EXPIRED: FSPIOPErrorCode; // code: '3302', message: 'Quote expired' },
      TRANSFER_EXPIRED: FSPIOPErrorCode; // code: '3303', message: 'Transfer expired' },

      // payer errors
      PAYER_ERROR: FSPIOPErrorCode; // code: '4000', message: 'Generic Payer error' },
      PAYER_FSP_INSUFFICIENT_LIQUIDITY: FSPIOPErrorCode; // code: '4001', message: 'Payer FSP insufficient liquidity' },
      PAYER_REJECTION: FSPIOPErrorCode; // code: '4100', message: 'Generic Payer rejection' },
      PAYER_REJECTED_TXN_REQUEST: FSPIOPErrorCode; // code: '4101', message: 'Payer rejected transaction request' },
      PAYER_FSP_UNSUPPORTED_TXN_TYPE: FSPIOPErrorCode; // code: '4102', message: 'Payer FSP unsupported transaction type' },
      PAYER_UNSUPPORTED_CURRENCY: FSPIOPErrorCode; // code: '4103', message: 'Payer unsupported currency' },
      PAYER_LIMIT_ERROR: FSPIOPErrorCode; // code: '4200', message: 'Payer limit error' },
      PAYER_PERMISSION_ERROR: FSPIOPErrorCode; // code: '4300', message: 'Payer permission error' },
      PAYER_BLOCKED_ERROR: FSPIOPErrorCode; // code: '4400', message: 'Generic Payer blocked error' },

      // payee errors
      PAYEE_ERROR: FSPIOPErrorCode; // code: '5000', message: 'Generic Payee error' },
      PAYEE_FSP_INSUFFICIENT_LIQUIDITY: FSPIOPErrorCode; // code: '5001', message: 'Payee FSP insufficient liquidity' },
      PAYEE_REJECTION: FSPIOPErrorCode; // code: '5100', message: 'Generic Payee rejection' },
      PAYEE_REJECTED_QUOTE: FSPIOPErrorCode; // code: '5101', message: 'Payee rejected quote' },
      PAYEE_FSP_UNSUPPORTED_TXN_TYPE: FSPIOPErrorCode; // code: '5102', message: 'Payee FSP unsupported transaction type' },
      PAYEE_FSP_REJECTED_QUOTE: FSPIOPErrorCode; // code: '5103', message: 'Payee FSP rejected quote' },
      PAYEE_REJECTED_TXN: FSPIOPErrorCode; // code: '5104', message: 'Payee rejected transaction' },
      PAYEE_FSP_REJECTED_TXN: FSPIOPErrorCode; // code: '5105', message: 'Payee FSP rejected transaction' },
      PAYEE_UNSUPPORTED_CURRENCY: FSPIOPErrorCode; // code: '5106', message: 'Payee unsupported currency' },
      PAYEE_LIMIT_ERROR: FSPIOPErrorCode; // code: '5200', message: 'Payee limit error' },
      PAYEE_PERMISSION_ERROR: FSPIOPErrorCode; // code: '5300', message: 'Payee permission error' },
      GENERIC_PAYEE_BLOCKED_ERROR: FSPIOPErrorCode; // code: '5400', message: 'Generic Payee blocked error' }
    };
  }
  export function ReformatFSPIOPError(
    error: Record<string, unknown>,
    apiErrorCode?: FSPIOPErrorCode,
    replyTo?: string,
    extensions?: Record<string, unknown>
  ): FSPIOPError

  export function CreateFSPIOPError(
    apiErrorCode?: FSPIOPErrorCode,
    message?: string,
    cause?: Record<string, unknown>,
    replyTo?: string,
    extensions?: Record<string, unknown>,
    useDescriptionAsMessage?: boolean
  ): FSPIOPError
}
declare module '@mojaloop/central-services-shared' {
  interface ReturnCode {
    CODE: number;
    DESCRIPTION: string;
  }
  interface HttpEnum {
    Headers: {
      FSPIOP: {
        SWITCH: {
          regex: RegExp;
          value: string;
        };
        SOURCE: string;
        DESTINATION: string;
        HTTP_METHOD: string;
        SIGNATURE: string;
        URI: string;
      };
    };
    ReturnCodes: {
      OK: ReturnCode;
      ACCEPTED: ReturnCode;
      BADREQUEST: ReturnCode;
      // note: yes this seems to be misspelled in @mojaloop/central-services-shared
      INTERNALSERVERERRROR: ReturnCode;
    };
    RestMethods: {
      GET: string;
      POST: string;
      PUT: string;
      DELETE: string;
      PATCH: string;
    };
    ResponseTypes: {
      JSON: string;
    };
  }

  enum FspEndpointTypesEnum {
    FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE = 'FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE',
    FSPIOP_CALLBACK_URL = 'FSPIOP_CALLBACK_URL',
    FSPIOP_CALLBACK_URL_PARTICIPANT_PUT = 'FSPIOP_CALLBACK_URL_PARTICIPANT_PUT',
    FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR = 'FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR',
    FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT = 'FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT',
    FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT_ERROR = 'FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT_ERROR',
    FSPIOP_CALLBACK_URL_PARTICIPANT_DELETE = 'FSPIOP_CALLBACK_URL_PARTICIPANT_DELETE',
    FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_DELETE = 'FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_DELETE',
    FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT = 'FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT',
    FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR = 'FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR',
    FSPIOP_CALLBACK_URL_PARTIES_GET = 'FSPIOP_CALLBACK_URL_PARTIES_GET',
    FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_GET = 'FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_GET',
    FSPIOP_CALLBACK_URL_PARTIES_PUT = 'FSPIOP_CALLBACK_URL_PARTIES_PUT',
    FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT = 'FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT',
    FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR = 'FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR',
    FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT_ERROR = 'FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT_ERROR',
    FSPIOP_CALLBACK_URL_TRANSFER_POST = 'FSPIOP_CALLBACK_URL_TRANSFER_POST',
    FSPIOP_CALLBACK_URL_TRANSFER_PUT = 'FSPIOP_CALLBACK_URL_TRANSFER_PUT',
    FSPIOP_CALLBACK_URL_TRANSFER_ERROR = 'FSPIOP_CALLBACK_URL_TRANSFER_ERROR',
    ALARM_NOTIFICATION_URL = 'ALARM_NOTIFICATION_URL',
    ALARM_NOTIFICATION_TOPIC = 'ALARM_NOTIFICATION_TOPIC',
    NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL = 'NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL',
    NET_DEBIT_CAP_ADJUSTMENT_EMAIL = 'NET_DEBIT_CAP_ADJUSTMENT_EMAIL',
    SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL = 'SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL',
    FSPIOP_CALLBACK_URL_QUOTES = 'FSPIOP_CALLBACK_URL_QUOTES',
    FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST = 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST',
    FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT = 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT',
    FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR = 'FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR',
    FSPIOP_CALLBACK_URL_AUTHORIZATIONS = 'FSPIOP_CALLBACK_URL_AUTHORIZATIONS',
    THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_POST = 'FSPIOP_THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_POST',
    THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_PUT = 'FSPIOP_THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_PUT',
    THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_ERROR = 'FSPIOP_THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_PUT_ERROR',
    THIRDPARTY_CALLBACK_URL_TRX_REQ_POST = 'THIRDPARTY_CALLBACK_URL_TRX_REQ_POST'
  }
  interface EndPointsEnum {
    EndpointType: {
      ALARM_NOTIFICATION_URL: number;
      ALARM_NOTIFICATION_TOPIC: number;
      FSPIOP_CALLBACK_URL_TRANSFER_POST: number;
      FSPIOP_CALLBACK_URL_TRANSFER_PUT: number;
      FSPIOP_CALLBACK_URL_TRANSFER_ERROR: number;
    };
    FspEndpointTypes: {
      FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_TRX_REQ_SERVICE;
      FSPIOP_CALLBACK_URL: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL;
      FSPIOP_CALLBACK_URL_PARTICIPANT_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_PUT;
      FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_PUT_ERROR;
      FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT;
      FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_PUT_ERROR;
      FSPIOP_CALLBACK_URL_PARTICIPANT_DELETE: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_DELETE;
      FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_DELETE: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_SUB_ID_DELETE;
      FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT;
      FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTICIPANT_BATCH_PUT_ERROR;
      FSPIOP_CALLBACK_URL_PARTIES_GET: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_GET;
      FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_GET: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_GET;
      FSPIOP_CALLBACK_URL_PARTIES_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_PUT;
      FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT;
      FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_PUT_ERROR;
      FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_PARTIES_SUB_ID_PUT_ERROR;
      FSPIOP_CALLBACK_URL_TRANSFER_POST: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_TRANSFER_POST;
      FSPIOP_CALLBACK_URL_TRANSFER_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_TRANSFER_PUT;
      FSPIOP_CALLBACK_URL_TRANSFER_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_TRANSFER_ERROR;
      ALARM_NOTIFICATION_URL: FspEndpointTypesEnum.ALARM_NOTIFICATION_URL;
      ALARM_NOTIFICATION_TOPIC: FspEndpointTypesEnum.ALARM_NOTIFICATION_TOPIC;
      NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL: FspEndpointTypesEnum.NET_DEBIT_CAP_THRESHOLD_BREACH_EMAIL;
      NET_DEBIT_CAP_ADJUSTMENT_EMAIL: FspEndpointTypesEnum.NET_DEBIT_CAP_ADJUSTMENT_EMAIL;
      SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL: FspEndpointTypesEnum.SETTLEMENT_TRANSFER_POSITION_CHANGE_EMAIL;
      FSPIOP_CALLBACK_URL_QUOTES: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_QUOTES;
      FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_BULK_TRANSFER_POST;
      FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_BULK_TRANSFER_PUT;
      FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_BULK_TRANSFER_ERROR;
      FSPIOP_CALLBACK_URL_AUTHORIZATIONS: FspEndpointTypesEnum.FSPIOP_CALLBACK_URL_AUTHORIZATIONS;
      THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_POST: FspEndpointTypesEnum.THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_POST;
      THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_PUT: FspEndpointTypesEnum.THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_PUT;
      THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_ERROR: FspEndpointTypesEnum.THIRDPARTY_TRANSACTIONS_AUTHORIZATIONS_ERROR;
      THIRDPARTY_CALLBACK_URL_TRX_REQ_POST: FspEndpointTypesEnum.THIRDPARTY_CALLBACK_URL_TRX_REQ_POST;
    };
    FspEndpointTemplates: {
      TRANSACTION_REQUEST_POST: string;
      TRANSACTION_REQUEST_PUT: string;
      TRANSACTION_REQUEST_GET: string;
      TRANSACTION_REQUEST_PUT_ERROR: string;
      PARTICIPANT_ENDPOINTS_GET: string;
      PARTICIPANTS_GET: string;
      PARTIES_GET: string;
      PARTIES_PUT_ERROR: string;
      PARTIES_SUB_ID_PUT_ERROR: string;
      ORACLE_PARTICIPANTS_TYPE_ID: string;
      ORACLE_PARTICIPANTS_TYPE_ID_CURRENCY: string;
      ORACLE_PARTICIPANTS_TYPE_ID_SUB_ID: string;
      ORACLE_PARTICIPANTS_TYPE_ID_CURRENCY_SUB_ID: string;
      ORACLE_PARTICIPANTS_BATCH: string;
      TRANSFERS_POST: string;
      TRANSFERS_PUT: string;
      TRANSFERS_PUT_ERROR: string;
      BULK_TRANSFERS_POST: string;
      BULK_TRANSFERS_PUT: string;
      BULK_TRANSFERS_PUT_ERROR: string;
      THIRDPARTY_TRANSACTION_REQUEST_PUT_ERROR: string;
      THIRDPARTY_TRANSACTION_REQUEST_POST: string;
    };
  }
  interface Enum {
    Http: HttpEnum;
    EndPoints: EndPointsEnum;
    Events: {
      Event: {
        Action: {
          POST: string;
        };
        Type: {
          TRANSACTION_REQUEST: string;
        };
      };
    };
  }
  class Endpoints {
    public fetchEndpoints(fspId: string): Promise<{[id: string]: string}>

    public getEndpoint(
      switchUrl: string,
      fsp: string,
      endpointType: FspEndpointTypesEnum,
      options?: {[id: string]: string | number | boolean }
    ): Promise<string>

    public initializeCache(policyOptions: Record<string, unknown>): Promise<boolean>
  }
  interface Span {
    getChild (id: string): Span;
    setTags (tags: {[id: string]: string}): void;
  }

  import OpenAPIBackend, { Context, Handler } from 'openapi-backend'
  import { SpawnSyncOptions } from 'child_process'
  import { InstanceOptions } from 'ajv'

  class Request {
    public sendRequest(
      url: string,
      headers: {[id: string]: string},
      source: string,
      destination: string,
      method?: string,
      payload?: Record<string, unknown>,
      responseType?: string,
      span?: SpawnSyncOptions,
      jwsSigner?: any
    ): Promise<any>
  }

  interface Util {
    Endpoints: Endpoints;
    Request: Request;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Hapi: any;
    OpenapiBackend: {
      initialise(
        definitionPath: string,
        handlers: { [handler: string]: Handler },
        ajvOpts?: InstanceOptions,
        regexFlags?: string
      ): Promise<OpenAPIBackend>;

      validationFail(context: Context): void;
      notFound(context: Context): void;
      methodNotAllowed(context: Context): void;
    };
  }

  const Enum: Enum
  const Util: Util
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HealthCheck: any
}

declare module '@mojaloop/central-services-metrics'
declare module '@hapi/good'
declare module 'blipp'
declare module 'convict-commander'

// version 2.4 -> https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/javascript-state-machine/index.d.ts
// we are using ^3.1.0
declare module 'javascript-state-machine' {
  type Method = (...args: unknown[]) => void | Promise<void>
  type Data = Record<string, string | number | boolean | unknown>


    interface Transition {
      name: string;
      from: string;
      to: string;
    }
  interface TransitionEvent<JSM> {
    transition: string;
    from: string;
    to: string;
    fsm: JSM;
    event: string;
  }
  interface StateMachineConfig {
    init?: string;
    transitions: Transition[];
    data?: Data;
    methods?: Record<string, Method>;
  }

  interface StateMachineInterface {
    // current state
    state: string;

    // return true if state s is the current state
    is(s: string): boolean

    // return true if transition t can occur from the current state
    can(t: string): boolean

    // return true if transition t cannot occur from the current state
    cannot(t: string): boolean

    // return list of transitions that are allowed from the current state
    transitions(): string[]

    // return list of all possible transitions
    allTransitions(): string[]

    // return list of all possible states
    allStates(): string []
  }
  export default class StateMachine {
    constructor(config: StateMachineConfig)

    // current state
    state: string;

    // return true if state s is the current state
    is(s: string): boolean

    // return true if transition t can occur from the current state
    can(t: string): boolean

    // return true if transition t cannot occur from the current state
    cannot(t: string): boolean

    // return list of transitions that are allowed from the current state
    transitions(): string[]

    // return list of all possible transitions
    allTransitions(): string[]

    // return list of all possible states
    allStates(): string []

    static factory(spec: StateMachineConfig): StateMachine
  }

}
