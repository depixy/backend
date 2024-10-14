import { Type } from "@sinclair/typebox";

export const booleanFilter = Type.Union([
  Type.Boolean(),
  Type.Recursive(thisType => Type.Object({
    equals: Type.Optional(Type.Boolean()),
    not: Type.Optional(thisType)
  }))
]);
