import { Type } from "@sinclair/typebox";

export const userLoginNameSchema = Type.String({
  title: "Login Name",
  description: "Login name of the user. It is private and unique.",
  minLength: 3,
  maxLength: 32
});
