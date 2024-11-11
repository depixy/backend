import { Type } from "@sinclair/typebox";
import { sortOrderAgg, sortOrderSchema } from "#schema/basic";

export const tagOrderBySchema = Type.Object({
  color: Type.Optional(sortOrderSchema),
  createdAt: Type.Optional(sortOrderSchema),
  galleries: Type.Optional(sortOrderAgg),
  id: Type.Optional(sortOrderSchema),
  name: Type.Optional(sortOrderSchema),
  updatedAt: Type.Optional(sortOrderSchema)
});
