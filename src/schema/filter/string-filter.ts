import { Type } from "@sinclair/typebox";

export const stringFilter = Type.Union([
  Type.String(),
  Type.Recursive(thisType => Type.Object({
    equals: Type.Optional(Type.String()),
    in: Type.Optional(Type.Array(Type.String())),
    notIn: Type.Optional(Type.Array(Type.String())),
    contains: Type.Optional(Type.String()),
    startsWith: Type.Optional(Type.String()),
    endsWith: Type.Optional(Type.String()),
    not: Type.Optional(thisType)
  }))
]);
