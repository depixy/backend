import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "#schema/basic";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategoryCreateInputSchema = Type.Object({
  name: tagCategoryNameSchema,
  color: hexColorSchema,
  priority: Type.Integer()
}, {
  title: "Tag Category Create Input",
  additionalProperties: false
});
