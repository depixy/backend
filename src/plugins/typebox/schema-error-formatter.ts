import { ValidationError } from "#plugins/typebox";

interface FastifySchemaValidationError {
  instancePath: string;
  keyword: string;
  message?: string;
  params: Record<string, unknown>;
  schemaPath: string;
}

export function schemaErrorFormatter(errors: FastifySchemaValidationError[]): Error {
  return new ValidationError(errors.map(e => ({ message: e.message ?? "Invalid input", path: e.instancePath })));
}
