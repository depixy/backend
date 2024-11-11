import { Type } from "@sinclair/typebox";

export const paginationResultSchema = Type.Object({
  page: Type.Number({ example: 1 }),
  size: Type.Number({ example: 100 }),
  totalPages: Type.Number({ example: 10 })
});
