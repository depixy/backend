import { Type } from "@sinclair/typebox";

export const tagNameSchema = Type.String({
  example: "Tag",
  minLength: 1
});
