/* eslint-disable @typescript-eslint/naming-convention */
import {
  forbiddenErrorSchema,
  internalServerErrorSchema,
  invalidInputErrorSchema,
  notFoundErrorSchema,
  unsupportedMediaTypeErrorSchema
} from "../error/index.js";

import type { TSchema } from "@sinclair/typebox";

export interface ApiResponse<T extends TSchema> {
  readonly 200: T;
  readonly 403: typeof forbiddenErrorSchema;
  readonly 404: typeof notFoundErrorSchema;
  readonly 415: typeof unsupportedMediaTypeErrorSchema;
  readonly 422: typeof invalidInputErrorSchema;
  readonly 500: typeof internalServerErrorSchema;
}

export function apiResponse<T extends TSchema>(successSchema: T): ApiResponse<T> {
  return {
    200: successSchema,
    403: forbiddenErrorSchema,
    404: notFoundErrorSchema,
    415: unsupportedMediaTypeErrorSchema,
    422: invalidInputErrorSchema,
    500: internalServerErrorSchema
  };
}
