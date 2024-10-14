import { Type } from "@sinclair/typebox";
import { emailSchema } from "#schema/basic";
import { displayNameSchema } from "./display-name.js";
import { loginNameSchema } from "./login-name.js";
import { passwordSchema } from "./password.js";

export const userCreateInputSchema = Type.Object({
  loginName: loginNameSchema,
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema
}, { additionalProperties: false });
