import { Type } from "@sinclair/typebox";

export const validationErrorSchema = Type.Object({
  path: Type.String({ example: "/id" }),
  // TODO: Example Code
  // code: Type.String(),
  message: Type.String()
}, { additionalProperties: false });

export const invalidInputErrorSchema = Type.Object({
  code: Type.Const("INVALID_INPUT" as const, { default: "INVALID_INPUT" }),
  data: Type.Object(
    { fieldErrors: Type.Array(validationErrorSchema) },
    { additionalProperties: false }
  ),
  message: Type.String({ example: "Invalid input" }),
  reqId: Type.String({
    description: "Request id",
    example: "00000000-0000-0000-0000-000000000000",
    format: "uuid"
  }),
  success: Type.Const(false as const, { default: false })
}, {
  additionalProperties: false,
  description: "Invalid input"
});
