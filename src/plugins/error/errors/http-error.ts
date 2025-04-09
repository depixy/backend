import { ApiError } from "./api-error.js";
import type { ApiErrorOptions } from "./api-error.js";

interface Option<T extends Record<string, unknown>> {
  cause?: unknown;
  code?: string;
  data?: T;
  message?: string;
}

export class HttpError<T extends Record<string, unknown> = {}> extends ApiError {
  private constructor(opts: ApiErrorOptions<T>) {
    super(opts);
  }

  public static badRequest<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "BAD_REQUEST", data, message = "Bad Request" } = opts;
    return new HttpError({ cause, code, data, message, status: 400 });
  }

  public static unauthorized<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "UNAUTHORIZED", data, message = "Unauthorized" } = opts;
    return new HttpError({ cause, code, data, message, status: 401 });
  }

  public static paymentRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "PAYMENT_REQUIRED", data, message = "Payment Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 402 });
  }

  public static forbidden<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "FORBIDDEN", data, message = "Forbidden" } = opts;
    return new HttpError({ cause, code, data, message, status: 403 });
  }

  public static notFound<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "NOT_FOUND", data, message = "Not Found" } = opts;
    return new HttpError({ cause, code, data, message, status: 404 });
  }

  public static methodNotAllowed<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "METHOD_NOT_ALLOWED", data, message = "Method Not Allowed" } = opts;
    return new HttpError({ cause, code, data, message, status: 405 });
  }

  public static notAcceptable<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "NOT_ACCEPTABLE", data, message = "Not Acceptable" } = opts;
    return new HttpError({ cause, code, data, message, status: 406 });
  }

  public static proxyAuthenticationRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "PROXY_AUTHENTICATION_REQUIRED", data, message = "Proxy Authentication Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 407 });
  }

  public static requestTimeout<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "REQUEST_TIMEOUT", data, message = "Request Timeout" } = opts;
    return new HttpError({ cause, code, data, message, status: 408 });
  }

  public static conflict<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "CONFLICT", data, message = "Conflict" } = opts;
    return new HttpError({ cause, code, data, message, status: 409 });
  }

  public static gone<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "GONE", data, message = "Gone" } = opts;
    return new HttpError({ cause, code, data, message, status: 410 });
  }

  public static lengthRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "LENGTH_REQUIRED", data, message = "Length Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 411 });
  }

  public static preconditionFailed<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "PRECONDITION_FAILED", data, message = "Precondition Failed" } = opts;
    return new HttpError({ cause, code, data, message, status: 412 });
  }

  public static payloadTooLarge<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "PAYLOAD_TOO_LARGE", data, message = "Payload Too Large" } = opts;
    return new HttpError({ cause, code, data, message, status: 413 });
  }

  public static uRITooLong<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "URI_TOO_LONG", data, message = "URI Too Long" } = opts;
    return new HttpError({ cause, code, data, message, status: 414 });
  }

  public static unsupportedMediaType<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "UNSUPPORTED_MEDIA_TYPE", data, message = "Unsupported Media Type" } = opts;
    return new HttpError({ cause, code, data, message, status: 415 });
  }

  public static rangeNotSatisfiable<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "RANGE_NOT_SATISFIABLE", data, message = "Range Not Satisfiable" } = opts;
    return new HttpError({ cause, code, data, message, status: 416 });
  }

  public static expectationFailed<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "EXPECTATION_FAILED", data, message = "Expectation Failed" } = opts;
    return new HttpError({ cause, code, data, message, status: 417 });
  }

  public static imATeapot<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "I'M_A_TEAPOT", data, message = "I'm a Teapot" } = opts;
    return new HttpError({ cause, code, data, message, status: 418 });
  }

  public static misdirectedRequest<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "MISDIRECTED_REQUEST", data, message = "Misdirected Request" } = opts;
    return new HttpError({ cause, code, data, message, status: 421 });
  }

  public static unprocessableEntity<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "UNPROCESSABLE_ENTITY", data, message = "Unprocessable Entity" } = opts;
    return new HttpError({ cause, code, data, message, status: 422 });
  }

  public static locked<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "LOCKED", data, message = "Locked" } = opts;
    return new HttpError({ cause, code, data, message, status: 423 });
  }

  public static failedDependency<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "FAILED_DEPENDENCY", data, message = "Failed Dependency" } = opts;
    return new HttpError({ cause, code, data, message, status: 424 });
  }

  public static tooEarly<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "TOO_EARLY", data, message = "Too Early" } = opts;
    return new HttpError({ cause, code, data, message, status: 425 });
  }

  public static upgradeRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "UPGRADE_REQUIRED", data, message = "Upgrade Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 426 });
  }

  public static preconditionRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "PRECONDITION_REQUIRED", data, message = "Precondition Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 428 });
  }

  public static tooManyRequests<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "TOO_MANY_REQUESTS", data, message = "Too Many Requests" } = opts;
    return new HttpError({ cause, code, data, message, status: 429 });
  }

  public static requestHeaderFieldsTooLarge<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "REQUEST HEADER FIELDS_TOO_LARGE", data, message = "Request Header Fields Too Large" } = opts;
    return new HttpError({ cause, code, data, message, status: 431 });
  }

  public static unavailableForLegalReasons<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "UNAVAILABLE FOR_LEGAL_REASONS", data, message = "Unavailable For Legal Reasons" } = opts;
    return new HttpError({ cause, code, data, message, status: 451 });
  }

  public static internalServerError<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "INTERNAL_SERVER_ERROR", data, message = "Internal Server Error" } = opts;
    return new HttpError({ cause, code, data, message, status: 500 });
  }

  public static notImplemented<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "NOT_IMPLEMENTED", data, message = "Not Implemented" } = opts;
    return new HttpError({ cause, code, data, message, status: 501 });
  }

  public static badGateway<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "BAD_GATEWAY", data, message = "Bad Gateway" } = opts;
    return new HttpError({ cause, code, data, message, status: 502 });
  }

  public static serviceUnavailable<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "SERVICE_UNAVAILABLE", data, message = "Service Unavailable" } = opts;
    return new HttpError({ cause, code, data, message, status: 503 });
  }

  public static gatewayTimeout<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "GATEWAY_TIMEOUT", data, message = "Gateway Timeout" } = opts;
    return new HttpError({ cause, code, data, message, status: 504 });
  }

  public static hTTPVersionNotSupported<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "HTTP VERSION_NOT_SUPPORTED", data, message = "HTTP Version Not Supported" } = opts;
    return new HttpError({ cause, code, data, message, status: 505 });
  }

  public static variantAlsoNegotiates<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "VARIANT_ALSO_NEGOTIATES", data, message = "Variant Also Negotiates" } = opts;
    return new HttpError({ cause, code, data, message, status: 506 });
  }

  public static insufficientStorage<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "INSUFFICIENT_STORAGE", data, message = "Insufficient Storage" } = opts;
    return new HttpError({ cause, code, data, message, status: 507 });
  }

  public static loopDetected<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "LOOP_DETECTED", data, message = "Loop Detected" } = opts;
    return new HttpError({ cause, code, data, message, status: 508 });
  }

  public static bandwidthLimitExceeded<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "BANDWIDTH_LIMIT_EXCEEDED", data, message = "Bandwidth Limit Exceeded" } = opts;
    return new HttpError({ cause, code, data, message, status: 509 });
  }

  public static notExtended<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "NOT_EXTENDED", data, message = "Not Extended" } = opts;
    return new HttpError({ cause, code, data, message, status: 510 });
  }

  public static networkAuthenticationRequired<T extends Record<string, unknown> = {}>(opts: Option<T> = {}): HttpError<T> {
    const { cause, code = "NETWORK_AUTHENTICATION_REQUIRED", data, message = "Network Authentication Required" } = opts;
    return new HttpError({ cause, code, data, message, status: 511 });
  }
}
