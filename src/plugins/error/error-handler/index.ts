import { HttpError } from "../errors/http-error.js";
import { ErrorHandler } from "./error-handler.js";
import { fastifyErrorFormatter } from "./fastify-error-formatter.js";
import { errorHandlerSymbol } from "./symbol.js";
import type { FastifyBaseLogger, FastifyInstance } from "fastify";

export async function setErrorHandler(app: FastifyInstance, logger: FastifyBaseLogger): Promise<void> {
  logger.debug("Set ErrorHandler");
  app.decorate(errorHandlerSymbol, new ErrorHandler(logger));
  app.setErrorHandler(function (error, req, res) {
    return this[errorHandlerSymbol].handle(error, req, res);
  });
  app.setNotFoundHandler(function (req, res) {
    return this[errorHandlerSymbol].handle(HttpError.notFound(), req, res);
  });
  app.decorate("addErrorFormatter", function (formatter) {
    this[errorHandlerSymbol].addFormatter(formatter);
  });
  app.addErrorFormatter(fastifyErrorFormatter);
}

export type { ErrorFormatter } from "./error-handler.js";

declare module "fastify" {
  interface FastifyInstance {
    addErrorFormatter: ErrorHandler["addFormatter"];
    [errorHandlerSymbol]: ErrorHandler;
  }
}
