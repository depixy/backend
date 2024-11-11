import { Type } from "@sinclair/typebox";

export const stringFilter = Type.Union([
  Type.String(),
  Type.Recursive(thisType => Type.Object({
    contains: Type.Optional(Type.String()),
    endsWith: Type.Optional(Type.String()),
    equals: Type.Optional(Type.String()),
    in: Type.Optional(Type.Array(Type.String())),
    not: Type.Optional(thisType),
    notIn: Type.Optional(Type.Array(Type.String())),
    startsWith: Type.Optional(Type.String())
  }))
]);
