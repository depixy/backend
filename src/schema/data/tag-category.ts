import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategorySchema = Type.Object({
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  priority: Type.Integer(),
  color: hexColorSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
