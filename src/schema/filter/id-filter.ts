import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const idFilter = Type.Union([
  uuidSchema(),
  Type.Recursive(thisType => Type.Object({
    equals: Type.Optional(uuidSchema()),
    in: Type.Optional(Type.Array(uuidSchema())),
    not: Type.Optional(thisType),
    notIn: Type.Optional(Type.Array(uuidSchema()))
  }))
]);
