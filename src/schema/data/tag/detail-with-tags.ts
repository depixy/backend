import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "../tag-category/entity.js";
import { tagDetailSchema } from "./detail.js";

export const tagDetailWithTagsSchema = Type.Object({
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  category: tagCategorySchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  parentTags: Type.Array(tagDetailSchema),
  childTags: Type.Array(tagDetailSchema)
});
