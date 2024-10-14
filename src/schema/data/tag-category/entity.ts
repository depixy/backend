import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "../../basic/index.js";
import { dateTimeSchema, uuidSchema } from "../../scalar/index.js";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategorySchema = Type.Object({
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  color: hexColorSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
