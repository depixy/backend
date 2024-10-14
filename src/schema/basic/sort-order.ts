import { Type } from "@sinclair/typebox";

export const sortOrderSchema = Type.Union([
  Type.Const("asc" as const),
  Type.Const("desc" as const)
]);
