import { Type } from "@sinclair/typebox";

export const userPasswordSchema = Type.String({
  title: "Password",
  minLength: 12,
  maxLength: 128
});
