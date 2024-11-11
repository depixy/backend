import { Type } from "@sinclair/typebox";
import { refreshTokenDescriptionSchema } from "./refresh-token-description.js";
import { userLoginNameSchema } from "./user-login-name.js";
import { userPasswordSchema } from "./user-password.js";

export const refreshTokenCreateInputSchema = Type.Object({
  description: refreshTokenDescriptionSchema,
  loginName: userLoginNameSchema,
  password: userPasswordSchema
}, {
  additionalProperties: false,
  title: "Refresh Token Create Input"
});
