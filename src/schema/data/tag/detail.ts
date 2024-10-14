import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "../tag-category/entity.js";

export const tagDetailSchema = Type.Object({
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  category: tagCategorySchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
});
