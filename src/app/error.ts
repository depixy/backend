import { ValidationError } from "@joshuaavalon/fastify-plugin-typebox";
import { Prisma } from "@prisma/client";
import { ApiError, InvalidInputError, httpError } from "#error";
import { StatusCodes } from "#utils";

import type {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest
} from "fastify";
import type { FastifySchemaValidationError } from "fastify/types/schema.js";

function sendApiError(res: FastifyReply, err: ApiError): void {
  const { status } = err;
  if (status >= 400) {
    if (status >= 500) {
      res.log.error({ reqId: res.request.id, err }, err.message);
    } else {
      res.log.warn({ reqId: res.request.id, err: err.toJson() }, err.message);
    }
  }
  res.status(status).send({ success: false, reqId: res.request.id, ...err.toJson() });
}

// eslint-disable-next-line max-params
export async function errorHandler(
  this: FastifyInstance,
  err: FastifyError,
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  if (err instanceof ApiError) {
    sendApiError(res, err);
    return;
  }
  if (err instanceof ValidationError) {
    sendApiError(res, InvalidInputError.validation(err));
    return;
  }
  if (err instanceof SyntaxError) {
    sendApiError(res, httpError(StatusCodes.forbidden, err.message));
    return;
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      // TODO
      case "P2002": {
        if (err.meta && Array.isArray(err.meta.target)) {
          sendApiError(res, new InvalidInputError(err.meta.target.map(field => ({
            path: `/${field}`,
            message: "Not unique"
          }))));
        } else {
          sendApiError(res, new InvalidInputError([]));
        }
        return;
      }
      // case "P2003":
      //   res.status(StatusCodes.unprocessableEntity).send({ success: false, code: "FOREIGN_CONSTRAINT", message: "Related record(s) exists / not exist", reqId: req.id });
      case "P2025":
        sendApiError(res, new InvalidInputError([{ path: "/", message: "Reference id(s) not found" }]));
        return;
      default:
        // No action
    }
  }
  // if (err instanceof Prisma.PrismaClientUnknownRequestError) {
  //   if (err.message.includes("check_self_ref_tag")) {
  //     sendApiError(res, new InvalidInputError([{ path: "/", message: "Self reference tags are not allowed" }]));
  //     return;
  //   }
  //   if (err.message.includes("TAG_PARENT_AND_CHILD_SAME")) {
  //     sendApiError(res, new InvalidInputError([{ path: "/", message: "Same reference tags are not allowed" }]));
  //     return;
  //   }
  //   if (err.message.includes("TAG_CIRCULAR_REF")) {
  //     sendApiError(res, new InvalidInputError([{ path: "/", message: "Circular reference tags are not allowed" }]));
  //     return;
  //   }
  // }
  let internalErr: ApiError;
  switch (err.code) {
    case "FST_ERR_CTP_INVALID_MEDIA_TYPE":
      internalErr = httpError(StatusCodes.unsupportedMediaType);
      break;
    case "FST_ERR_CTP_EMPTY_JSON_BODY":
      internalErr = httpError(StatusCodes.unsupportedMediaType);
      break;
    default:
      internalErr = httpError(StatusCodes.internalServerError);
  }
  internalErr.cause = err;
  sendApiError(res, internalErr);
}

export async function notFoundHandler(
  this: FastifyInstance,
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const err = httpError(StatusCodes.notFound);
  sendApiError(res, err);
}


export function errorFormatter(errors: FastifySchemaValidationError[]): InvalidInputError {
  return new InvalidInputError(errors.map(e => ({ path: e.instancePath, message: e.message ?? "Invalid input" })));
}
