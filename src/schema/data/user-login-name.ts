import { Type } from "@sinclair/typebox";

export const userLoginNameSchema = Type.String({
  description: "Login name of the user. It is unique.",
  maxLength: 32,
  minLength: 3,
  title: "Login Name"
});
