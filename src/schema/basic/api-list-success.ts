import { Type } from "@sinclair/typebox";
import { paginationResultSchema } from "./pagination-result.js";
import type { TArray, TLiteral, TObject } from "@sinclair/typebox";

export type ApiListSuccess<T extends TObject> = TObject<{ data: TArray<T>; success: TLiteral<true> }>;
export type ApiPaginationListSuccess<T extends TObject> = TObject<{ data: TArray<T>; pagination: typeof paginationResultSchema; success: TLiteral<true> }>;
export function apiListSuccess<T extends TObject>(data: T): ApiPaginationListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination: false): ApiListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination: true): ApiPaginationListSuccess<T>;
export function apiListSuccess<T extends TObject>(data: T, pagination = true): ApiListSuccess<T> | ApiPaginationListSuccess<T> {
  return pagination
    ? Type.Object({
      data: Type.Array(data),
      pagination: paginationResultSchema,
      success: Type.Const(true as const)
    }, { description: "Success" })
    : Type.Object({
      data: Type.Array(data),
      success: Type.Const(true as const)
    }, { description: "Success" });
}
