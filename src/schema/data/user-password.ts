import { Type } from "@sinclair/typebox";

export const userPasswordSchema = Type.String({
  maxLength: 128,
  minLength: 12,
  title: "Password"
});
