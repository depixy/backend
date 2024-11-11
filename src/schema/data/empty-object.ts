import { Type } from "@sinclair/typebox";

export const emptyObjectSchema = Type.Object({}, {
  additionalProperties: false,
  title: "Empty Object"
});
