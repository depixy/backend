import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const unsupportedMediaTypeErrorSchema = Type.Object({
  code: Type.Const("UNSUPPORTED_MEDIA_TYPE" as const, { default: "UNSUPPORTED_MEDIA_TYPE" }),
  message: Type.String({ example: "Unsupported Media Type" }),
  reqId: uuidSchema({ description: "Request id" }),
  success: Type.Const(false as const, { default: false })
}, {
  additionalProperties: false,
  description: "Unsupported Media Type"
});
