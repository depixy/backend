import { Type } from "@sinclair/typebox";
import { dateTimeFilter, idFilter, stringFilter } from "#schema/filter";

export const tagWhereSchema = Type.Recursive(thisType => Type.Object({
  AND: Type.Optional(Type.Array(thisType)),
  OR: Type.Optional(Type.Array(thisType)),
  NOT: Type.Optional(Type.Array(thisType)),
  id: Type.Optional(idFilter),
  name: Type.Optional(stringFilter),
  createdAt: Type.Optional(dateTimeFilter),
  updatedAt: Type.Optional(dateTimeFilter)
}));
