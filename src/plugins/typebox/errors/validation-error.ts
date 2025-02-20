import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { ApiError } from "#plugins/error";
import type { Static } from "@sinclair/typebox";
import type { ValueErrorIterator } from "@sinclair/typebox/errors";

const validationFieldErrorSchema = Type.Object({
  message: Type.String(),
  path: Type.String(),
  value: Type.Optional(Type.Unknown())
});

export type ValidationFieldError = Static<typeof validationFieldErrorSchema>;


export class ValidationError extends ApiError {
  public readonly fieldErrors: ValidationFieldError[];

  public constructor(errors: ValidationFieldError[], message = "Value does not match schema") {
    const fieldErrors = errors.map(v => {
      const newValue = Value.Clean(validationFieldErrorSchema, { ...v });
      Value.Assert(validationFieldErrorSchema, newValue);
      return newValue;
    });
    const data = { fieldErrors };
    super({ code: "INVALID_INPUT", data, message, status: 422 });
    this.fieldErrors = fieldErrors;
  }

  public static id(): ValidationError {
    return new ValidationError([{ message: "ID does not exist", path: "/id" }]);
  }

  public static version(): ValidationError {
    return new ValidationError([
      { message: "ID may not exist", path: "/id" },
      { message: "version may not match", path: "/version" }
    ]);
  }

  public static typebox(errors: ValueErrorIterator, message?: string): ValidationError {
    return new ValidationError([...errors].map(f => ({ message: f.message, path: f.path })), message);
  }
}
