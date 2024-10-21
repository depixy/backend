import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategoryNameSchema } from "./tag-category-name.js";
import { tagSchema } from "./tag/entity.js";

export const tagCategoryDetailSchema = Type.Object({
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  color: hexColorSchema,
  tags: Type.Array(tagSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
