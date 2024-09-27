import { ApiError } from "./api-error.js";

import type { ValidationError as TypeboxValidationError } from "@joshuaavalon/fastify-plugin-typebox";
import type { ValueErrorIterator } from "@sinclair/typebox/errors";

export interface ValidationError {
  path: string;
  value?: unknown;
  message: string;
}

export class InvalidInputError extends ApiError {
  public constructor(fields: ValidationError[], message = "Invalid input") {
    super({ status: 422, code: "INVALID_INPUT", message, fields });
  }

  public static id(): InvalidInputError {
    return new InvalidInputError([{ path: "/id", message: "ID does not exist" }]);
  }

  public static version(): InvalidInputError {
    return new InvalidInputError([
      { path: "/id", message: "ID may not exist" },
      { path: "/version", message: "version may not match" }
    ]);
  }

  public static typebox(errors: ValueErrorIterator, message?: string): InvalidInputError {
    return new InvalidInputError([...errors].map(f => ({ path: f.path, message: f.message })), message);
  }

  public static validation(errors: TypeboxValidationError): InvalidInputError {
    return new InvalidInputError(errors.fields.map(f => ({ path: f.path, message: f.message })));
  }
}
