import { Type } from "@sinclair/typebox";
import { dateTimeFilter, idFilter, intFilter, stringFilter } from "#schema/filter";
import { tagWhereSchema } from "./tag/where.js";

export const tagCategoryWhereSchema = Type.Recursive(thisType => Type.Object({
  AND: Type.Optional(Type.Array(thisType)),
  color: Type.Optional(stringFilter),
  createdAt: Type.Optional(dateTimeFilter),
  id: Type.Optional(idFilter),
  name: Type.Optional(stringFilter),
  NOT: Type.Optional(Type.Array(thisType)),
  OR: Type.Optional(Type.Array(thisType)),
  priority: Type.Optional(intFilter),
  tags: Type.Optional(Type.Object({
    every: Type.Optional(tagWhereSchema),
    none: Type.Optional(tagWhereSchema),
    some: Type.Optional(tagWhereSchema)
  })),
  updatedAt: Type.Optional(dateTimeFilter)
}), { additionalProperties: false });
