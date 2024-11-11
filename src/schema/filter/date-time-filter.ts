import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";

export const dateTimeFilter = Type.Union([
  dateTimeSchema,
  Type.Recursive(thisType => Type.Object({
    equals: Type.Optional(Type.String()),
    gt: Type.Optional(dateTimeSchema),
    gte: Type.Optional(dateTimeSchema),
    in: Type.Optional(Type.Array(dateTimeSchema)),
    lt: Type.Optional(dateTimeSchema),
    lte: Type.Optional(dateTimeSchema),
    not: Type.Optional(thisType),
    notIn: Type.Optional(Type.Array(dateTimeSchema))
  }))
]);
