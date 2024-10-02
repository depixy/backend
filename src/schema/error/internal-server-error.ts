import { Type } from "@sinclair/typebox";
import { uuidSchema } from "../scalar/index.js";

export const internalServerErrorSchema = Type.Object({
  success: Type.Const(false as const, { default: false }),
  code: Type.Const("INTERNAL_SERVER_ERROR" as const, { default: "INTERNAL_SERVER_ERROR" }),
  message: Type.String({ example: "Internal Server Error" }),
  reqId: uuidSchema({ description: "Request id" })
}, {
  description: "Internal Server Error",
  additionalProperties: false
});
