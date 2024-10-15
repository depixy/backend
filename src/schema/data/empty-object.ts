import { Type } from "@sinclair/typebox";

export const emptyObjectSchema = Type.Object({}, {
  title: "Empty Object",
  additionalProperties: false
});
