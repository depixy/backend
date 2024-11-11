import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { tagCategorySchema } from "../tag-category/entity.js";

export const tagDetailSchema = Type.Object({
  category: tagCategorySchema,
  createdAt: dateTimeSchema,
  id: uuidSchema(),
  name: Type.String({ example: "Tag" }),
  updatedAt: dateTimeSchema
});
