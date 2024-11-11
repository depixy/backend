import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "./tag-category.js";
import { tagNameSchema } from "./tag-name.js";

export const tagDetailSchema = Type.Object({
  category: tagCategorySchema,
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: tagNameSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
