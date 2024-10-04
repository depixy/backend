import { Type } from "@sinclair/typebox";

export const validationErrorSchema = Type.Object({
  path: Type.String({ example: "/id" }),
  // TODO: Example Code
  // code: Type.String(),
  message: Type.String()
}, { additionalProperties: false });

export const invalidInputErrorSchema = Type.Object({
  success: Type.Const(false as const, { default: false }),
  code: Type.Const("INVALID_INPUT" as const, { default: "INVALID_INPUT" }),
  message: Type.String({ example: "Invalid input" }),
  reqId: Type.String({
    description: "Request id",
    format: "uuid",
    example: "00000000-0000-0000-0000-000000000000"
  }),
  fields: Type.Array(validationErrorSchema)
}, {
  description: "Invalid input",
  additionalProperties: false
});
