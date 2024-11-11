import { Type } from "@sinclair/typebox";

export const tagCategoryNameSchema = Type.String({
  example: "Tag Category",
  minLength: 1
});
