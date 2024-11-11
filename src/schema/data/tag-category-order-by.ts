import { Type } from "@sinclair/typebox";
import { sortOrderAgg, sortOrderSchema } from "#schema/basic";

export const tagCategoryOrderBySchema = Type.Object({
  color: Type.Optional(sortOrderSchema),
  createdAt: Type.Optional(sortOrderSchema),
  id: Type.Optional(sortOrderSchema),
  name: Type.Optional(sortOrderSchema),
  priority: Type.Optional(sortOrderSchema),
  tags: Type.Optional(sortOrderAgg),
  updatedAt: Type.Optional(sortOrderSchema)
}, { additionalProperties: false });
