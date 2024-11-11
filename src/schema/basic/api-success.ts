import { Type } from "@sinclair/typebox";
import type { TLiteral, TNull, TObject, TUnion } from "@sinclair/typebox";

export type ApiSuccess<T extends TObject> = TObject<{ data: T; success: TLiteral<true> }>;
export type ApiNullableSuccess<T extends TObject> = TObject<{ data: TUnion<[T, TNull]>; success: TLiteral<true> }>;
export function apiSuccess<T extends TObject>(data: T): ApiSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable: false): ApiSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable: true): ApiNullableSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable = false): ApiNullableSuccess<T> | ApiSuccess<T> {
  if (nullable) {
    return Type.Object({
      data: Type.Union([data, Type.Null()]),
      success: Type.Const(true as const)
    }, { description: "Success" });
  }
  return Type.Object({
    data,
    success: Type.Const(true as const)
  }, { description: "Success" });
}
