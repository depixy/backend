import { Type } from "@sinclair/typebox";

export const userDisplayNameSchema = Type.String({
  title: "Display Name",
  minLength: 3,
  maxLength: 32
});
