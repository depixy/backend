import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const notFoundErrorSchema = Type.Object({
  code: Type.Const("NOT_FOUND" as const, { default: "NOT_FOUND" }),
  message: Type.String({ example: "Not Found" }),
  reqId: uuidSchema({ description: "Request id" }),
  success: Type.Const(false as const, { default: false })
}, {
  additionalProperties: false,
  description: "Not Found"
});
