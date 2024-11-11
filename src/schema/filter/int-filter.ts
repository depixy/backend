import { Type } from "@sinclair/typebox";

export const intFilter = Type.Union([
  Type.Integer(),
  Type.Recursive(thisType => Type.Object({
    equals: Type.Optional(Type.Integer()),
    gt: Type.Optional(Type.Integer()),
    gte: Type.Optional(Type.Integer()),
    in: Type.Optional(Type.Array(Type.Integer())),
    lt: Type.Optional(Type.Integer()),
    lte: Type.Optional(Type.Integer()),
    not: Type.Optional(thisType),
    notIn: Type.Optional(Type.Array(Type.Integer()))
  }))
]);
