import { Type } from "@sinclair/typebox";
import { emailSchema } from "#schema/scalar";
import { userDisplayNameSchema } from "./user-display-name.js";
import { userLoginNameSchema } from "./user-login-name.js";
import { userPasswordSchema } from "./user-password.js";

export const userCreateInputSchema = Type.Object({
  loginName: userLoginNameSchema,
  displayName: userDisplayNameSchema,
  email: emailSchema,
  password: userPasswordSchema
}, {
  title: "User Create Input",
  additionalProperties: false
});
