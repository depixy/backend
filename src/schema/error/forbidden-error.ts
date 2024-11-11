import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const forbiddenErrorSchema = Type.Object({
  code: Type.Const("FORBIDDEN" as const, { default: "FORBIDDEN" }),
  message: Type.String({ example: "Forbidden" }),
  reqId: uuidSchema({ description: "Request id" }),
  success: Type.Const(false as const, { default: false })
}, {
  additionalProperties: false,
  description: "Forbidden"
});
