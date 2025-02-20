import { ApiError, HttpError } from "../errors/index.js";
import type { FastifyBaseLogger, FastifyReply, FastifyRequest } from "fastify";

export type ErrorFormatter<T extends Record<string, unknown> = {}> = (error: Error) => Promise<ApiError<T> | null>;

export class ErrorHandler {
  private readonly formatters: ErrorFormatter[];
  private readonly logger: FastifyBaseLogger;

  public constructor(logger: FastifyBaseLogger) {
    this.formatters = [];
    this.logger = logger;
  }

  public addFormatter<T extends Record<string, unknown>>(formatter: ErrorFormatter<T>): void {
    this.formatters.push(formatter);
  }

  public async handle(err: Error, req: FastifyRequest, res: FastifyReply): Promise<void> {
    if (err instanceof ApiError) {
      return this.handleApiError(err, req, res);
    }
    for (const formatter of this.formatters) {
      const formattedError = await formatter(err);
      if (!formattedError) {
        continue;
      }
      return this.handleApiError(formattedError, req, res);
    }
    return this.handleApiError(HttpError.internalServerError({ cause: err }), req, res);
  }

  private async handleApiError(err: ApiError, _req: FastifyRequest, res: FastifyReply): Promise<void> {
    if (err.status >= 500) {
      res.log.error({ err }, err.message);
    } else {
      res.log.warn({ err }, err.message);
    }
    const { code, data, message, status } = err;
    await res.status(status).sendApi({ code, data, message, success: false });
  }
}
