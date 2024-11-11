import { Type } from "@sinclair/typebox";
import { emailSchema } from "#schema/scalar";
import { userDisplayNameSchema } from "./user-display-name.js";
import { userLoginNameSchema } from "./user-login-name.js";
import { userPasswordSchema } from "./user-password.js";

export const userCreateInputSchema = Type.Object({
  displayName: userDisplayNameSchema,
  email: emailSchema,
  loginName: userLoginNameSchema,
  password: userPasswordSchema
}, {
  additionalProperties: false,
  title: "User Create Input"
});
