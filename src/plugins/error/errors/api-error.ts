export interface ApiErrorOptions<T extends Record<string, unknown>> {
  cause?: unknown;

  /**
   * Unique error code per error
   */
  code: string;

  data?: T;

  /**
   * English error message
   */
  message: string;
  status: number;
}

export class ApiError<T extends Record<string, unknown> = {}> extends Error {
  public readonly data: T | null;
  public readonly status: number;
  public readonly code: string;

  public constructor(opts: ApiErrorOptions<T>) {
    const { cause, code, data = null, message, status } = opts;
    super(message, { cause });
    this.status = status;
    this.data = data;
    this.code = code;
  }
}
