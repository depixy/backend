import { Type } from "@sinclair/typebox";

export const userDisplayNameSchema = Type.String({
  maxLength: 32,
  minLength: 3,
  title: "Display Name"
});
