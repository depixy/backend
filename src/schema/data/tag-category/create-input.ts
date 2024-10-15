import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategoryCreateInputSchema = Type.Object({
  name: tagCategoryNameSchema,
  color: hexColorSchema
}, { additionalProperties: false });
