import { errorCodes } from "fastify";
import { HttpError } from "../errors/index.js";
import type { FastifyError } from "fastify";
import type { ErrorFormatter } from "./error-handler.js";

function isFastifyError(err: Error): err is FastifyError {
  for (const e of Object.values(errorCodes)) {
    if (err instanceof e) {
      return true;
    }
  }
  return false;
}

export const fastifyErrorFormatter: ErrorFormatter = async function (err) {
  if (!isFastifyError(err)) {
    return null;
  }
  switch (err.code) {
    case "FST_ERR_CTP_EMPTY_JSON_BODY":
      return HttpError.unsupportedMediaType({ cause: err });
    case "FST_ERR_CTP_INVALID_MEDIA_TYPE":
      return HttpError.unsupportedMediaType({ cause: err });
    default:
      return HttpError.internalServerError({ cause: err });
  }
};
