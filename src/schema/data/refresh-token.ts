import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";
import { refreshTokenDescriptionSchema } from "./refresh-token-description.js";

export const refreshTokenSchema = Type.Object({
  expiredAt: dateTimeSchema,
  description: refreshTokenDescriptionSchema
}, {
  title: "Refresh Token",
  description: "Refresh token is used to generate access token.",
  additionalProperties: false
});
