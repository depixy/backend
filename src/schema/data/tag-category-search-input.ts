import { Type } from "@sinclair/typebox";
import { pageInputSchema, sizeInputSchema } from "#schema/basic";
import { tagCategoryOrderBySchema } from "./tag-category-order-by.js";
import { tagCategoryWhereSchema } from "./tag-category-where.js";

export const tagCategorySearchInputSchema = Type.Object({
  orderBy: Type.Optional(Type.Array(tagCategoryOrderBySchema)),
  page: Type.Optional(pageInputSchema),
  size: Type.Optional(sizeInputSchema),
  where: Type.Optional(tagCategoryWhereSchema)
}, {
  additionalProperties: false,
  title: "Tag Category Search Input"
});
