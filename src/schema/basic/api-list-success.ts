import { Type } from "@sinclair/typebox";
import { paginationResultSchema } from "./pagination-result.js";

import type { TArray, TLiteral, TObject } from "@sinclair/typebox";

export type ApiListSuccess<T extends TObject> = TObject<{ success: TLiteral<true>; data: TArray<T> }>;
export type ApiPaginationListSuccess<T extends TObject> = TObject<{ success: TLiteral<true>; data: TArray<T>; pagination: typeof paginationResultSchema }>;
export function apiListSuccess<T extends TObject>(data: T): ApiPaginationListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination: false): ApiListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination: true): ApiPaginationListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination = true): ApiListSuccess<T> | ApiPaginationListSuccess<T> {
  return pagination
    ? Type.Object({
      success: Type.Const(true as const),
      data: Type.Array(data),
      pagination: paginationResultSchema
    }, { description: "Success" })
    : Type.Object({
      success: Type.Const(true as const),
      data: Type.Array(data)
    }, { description: "Success" });
}
