import { Type } from "@sinclair/typebox";
import { dateTimeFilter, idFilter, stringFilter } from "#schema/filter";
import { tagCategoryWhereSchema } from "./tag-category-where.js";

export const tagWhereDetailSchema = Type.Recursive(thisType => Type.Object({
  AND: Type.Optional(Type.Array(thisType)),
  category: Type.Optional(tagCategoryWhereSchema),
  createdAt: Type.Optional(dateTimeFilter),
  id: Type.Optional(idFilter),
  name: Type.Optional(stringFilter),
  NOT: Type.Optional(Type.Array(thisType)),
  OR: Type.Optional(Type.Array(thisType)),
  updatedAt: Type.Optional(dateTimeFilter)
}), { additionalProperties: false });
