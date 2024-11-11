import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "./tag-category.js";
import { tagDetailSchema } from "./tag-detail.js";
import { tagNameSchema } from "./tag-name.js";

export const tagDetailWithTagsSchema = Type.Object({
  category: tagCategorySchema,
  childTags: Type.Array(tagDetailSchema),
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: tagNameSchema,
  parentTags: Type.Array(tagDetailSchema),
  updatedAt: dateTimeSchema
});
