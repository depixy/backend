import { Type } from "@sinclair/typebox";
import { sortOrderAgg, sortOrderSchema } from "../../basic/index.js";

export const tagCategoryOrderBySchema = Type.Object({
  id: Type.Optional(sortOrderSchema),
  name: Type.Optional(sortOrderSchema),
  color: Type.Optional(sortOrderSchema),
  createdAt: Type.Optional(sortOrderSchema),
  updatedAt: Type.Optional(sortOrderSchema),
  tags: Type.Optional(sortOrderAgg)
}, { additionalProperties: false });
