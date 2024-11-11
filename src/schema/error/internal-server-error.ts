import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const internalServerErrorSchema = Type.Object({
  code: Type.Const("INTERNAL_SERVER_ERROR" as const, { default: "INTERNAL_SERVER_ERROR" }),
  message: Type.String({ example: "Internal Server Error" }),
  reqId: uuidSchema({ description: "Request id" }),
  success: Type.Const(false as const, { default: false })
}, {
  additionalProperties: false,
  description: "Internal Server Error"
});
