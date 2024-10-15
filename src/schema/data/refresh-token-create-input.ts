import { Type } from "@sinclair/typebox";
import { refreshTokenDescriptionSchema } from "./refresh-token-description.js";
import { userLoginNameSchema } from "./user-login-name.js";
import { userPasswordSchema } from "./user-password.js";

export const refreshTokenCreateInputSchema = Type.Object({
  loginName: userLoginNameSchema,
  password: userPasswordSchema,
  description: refreshTokenDescriptionSchema
}, {
  title: "Refresh Token Create Input",
  additionalProperties: false
});
