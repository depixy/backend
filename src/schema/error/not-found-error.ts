import { Type } from "@sinclair/typebox";
import { uuidSchema } from "../scalar/index.js";

export const notFoundErrorSchema = Type.Object({
  success: Type.Const(false as const, { default: false }),
  code: Type.Const("NOT_FOUND" as const, { default: "NOT_FOUND" }),
  message: Type.String({ example: "Not Found" }),
  reqId: uuidSchema({ description: "Request id" })
}, {
  description: "Not Found",
  additionalProperties: false
});
