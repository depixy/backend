import { Type } from "@sinclair/typebox";

import type { TLiteral, TNull, TObject, TUnion } from "@sinclair/typebox";

export type ApiSuccess<T extends TObject> = TObject<{ success: TLiteral<true>; data: T }>;
export type ApiNullableSuccess<T extends TObject> = TObject<{ success: TLiteral<true>; data: TUnion<[T, TNull]> }>;
export function apiSuccess<T extends TObject>(data: T): ApiSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable: false): ApiSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable: true): ApiNullableSuccess<T>;
export function apiSuccess<T extends TObject>(data: T, nullable = false): ApiNullableSuccess<T> | ApiSuccess<T> {
  if (nullable) {
    return Type.Object({
      success: Type.Const(true as const),
      data: Type.Union([data, Type.Null()])
    }, { description: "Success" });
  }
  return Type.Object({
    success: Type.Const(true as const),
    data
  }, { description: "Success" });
}
