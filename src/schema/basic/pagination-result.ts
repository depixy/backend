import { Type } from "@sinclair/typebox";

export const paginationResultSchema = Type.Object({
  totalPages: Type.Number({ example: 10 }),
  page: Type.Number({ example: 1 }),
  size: Type.Number({ example: 100 })
});
