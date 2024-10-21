import { Type } from "@sinclair/typebox";
import { dateTimeFilter, idFilter, intFilter, stringFilter } from "#schema/filter";
import { tagWhereSchema } from "./tag/where.js";

export const tagCategoryWhereSchema = Type.Recursive(thisType => Type.Object({
  AND: Type.Optional(Type.Array(thisType)),
  OR: Type.Optional(Type.Array(thisType)),
  NOT: Type.Optional(Type.Array(thisType)),
  id: Type.Optional(idFilter),
  name: Type.Optional(stringFilter),
  color: Type.Optional(stringFilter),
  priority: Type.Optional(intFilter),
  createdAt: Type.Optional(dateTimeFilter),
  updatedAt: Type.Optional(dateTimeFilter),
  tags: Type.Optional(Type.Object({
    every: Type.Optional(tagWhereSchema),
    some: Type.Optional(tagWhereSchema),
    none: Type.Optional(tagWhereSchema)
  }))
}), { additionalProperties: false });
