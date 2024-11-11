import { ApiError } from "./api-error.js";
import type { ValidationError as TypeboxValidationError } from "@joshuaavalon/fastify-plugin-typebox";
import type { ValueErrorIterator } from "@sinclair/typebox/errors";

export interface ValidationError {
  message: string;
  path: string;
  value?: unknown;
}

export class InvalidInputError extends ApiError {
  public constructor(fields: ValidationError[], message = "Invalid input") {
    super({ code: "INVALID_INPUT", fields, message, status: 422 });
  }

  public static id(): InvalidInputError {
    return new InvalidInputError([{ message: "ID does not exist", path: "/id" }]);
  }

  public static version(): InvalidInputError {
    return new InvalidInputError([
      { message: "ID may not exist", path: "/id" },
      { message: "version may not match", path: "/version" }
    ]);
  }

  public static typebox(errors: ValueErrorIterator, message?: string): InvalidInputError {
    return new InvalidInputError([...errors].map(f => ({ message: f.message, path: f.path })), message);
  }

  public static validation(errors: TypeboxValidationError): InvalidInputError {
    return new InvalidInputError(errors.fields.map(f => ({ message: f.message, path: f.path })));
  }
}
