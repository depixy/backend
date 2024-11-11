import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";
import { refreshTokenDescriptionSchema } from "./refresh-token-description.js";

export const refreshTokenSchema = Type.Object({
  description: refreshTokenDescriptionSchema,
  expiredAt: dateTimeSchema
}, {
  additionalProperties: false,
  description: "Refresh token is used to generate access token.",
  title: "Refresh Token"
});
