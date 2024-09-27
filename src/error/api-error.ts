export interface ApiErrorOptions {
  status: number;

  /**
   * Unique error code per error
   */
  code: string;

  /**
   * English error message
   */
  message: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  private readonly opts: Omit<ApiErrorOptions, "status">;
  public readonly status: number;

  public constructor(opts: ApiErrorOptions) {
    super(opts.message);
    const { status, ...others } = opts;
    this.status = status;
    this.opts = others;
  }

  public toJson(): Record<string, unknown> {
    return JSON.parse(JSON.stringify(this.opts));
  }
}
