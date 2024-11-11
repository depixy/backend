import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "../tag-category/entity.js";
import { tagDetailSchema } from "./detail.js";

export const tagDetailWithTagsSchema = Type.Object({
  category: tagCategorySchema,
  childTags: Type.Array(tagDetailSchema),
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  parentTags: Type.Array(tagDetailSchema),
  updatedAt: dateTimeSchema
});
