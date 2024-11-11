import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagNameSchema } from "./tag-name.js";

export const tagSchema = Type.Object({
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: tagNameSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
