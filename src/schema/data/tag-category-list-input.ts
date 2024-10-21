import { Type } from "@sinclair/typebox";
import { pageInputSchema, sizeInputSchema } from "#schema/basic";
import { tagCategoryOrderBySchema } from "./tag-category-order-by.js";
import { tagCategoryWhereSchema } from "./tag-category-where.js";

export const tagCategoryListInputSchema = Type.Object({
  page: Type.Optional(pageInputSchema),
  size: Type.Optional(sizeInputSchema),
  where: Type.Optional(tagCategoryWhereSchema),
  orderBy: Type.Optional(Type.Array(tagCategoryOrderBySchema))
}, {
  title: "Tag Category List Input",
  additionalProperties: false
});
