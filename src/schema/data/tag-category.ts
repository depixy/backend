import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategorySchema = Type.Object({
  color: hexColorSchema,
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  priority: Type.Integer(),
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
