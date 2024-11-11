import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategoryCreateInputSchema = Type.Object({
  color: hexColorSchema,
  name: tagCategoryNameSchema,
  priority: Type.Integer()
}, {
  additionalProperties: false,
  title: "Tag Category Create Input"
});
