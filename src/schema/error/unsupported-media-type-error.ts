import { Type } from "@sinclair/typebox";
import { uuidSchema } from "../scalar/index.js";

export const unsupportedMediaTypeErrorSchema = Type.Object({
  success: Type.Const(false as const, { default: false }),
  code: Type.Const("UNSUPPORTED_MEDIA_TYPE" as const, { default: "UNSUPPORTED_MEDIA_TYPE" }),
  message: Type.String({ example: "Unsupported Media Type" }),
  reqId: uuidSchema({ description: "Request id" })
}, {
  description: "Unsupported Media Type",
  additionalProperties: false
});
