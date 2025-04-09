import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategoryNameSchema } from "./tag-category-name.js";
import { tagSchema } from "./tag.js";

export const tagCategoryDetailSchema = Type.Object({
  color: hexColorSchema,
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  priority: Type.Integer(),
  tags: Type.Array(tagSchema),
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
