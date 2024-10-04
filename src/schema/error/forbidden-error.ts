import { Type } from "@sinclair/typebox";
import { uuidSchema } from "../scalar/index.js";

export const forbiddenErrorSchema = Type.Object({
  success: Type.Const(false as const, { default: false }),
  code: Type.Const("FORBIDDEN" as const, { default: "FORBIDDEN" }),
  message: Type.String({ example: "Forbidden" }),
  reqId: uuidSchema({ description: "Request id" })
}, {
  description: "Forbidden",
  additionalProperties: false
});
