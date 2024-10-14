import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";

export const tagSchema = Type.Object({
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
});
