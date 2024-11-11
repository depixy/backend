import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";

export const tagSchema = Type.Object({
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  updatedAt: dateTimeSchema
});
