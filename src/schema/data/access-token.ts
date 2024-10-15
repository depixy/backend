import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";

export const accessTokenSchema = Type.Object({ expiredAt: dateTimeSchema }, {
  title: "Access Token",
  description: "Access token is used to authenticate API.",
  additionalProperties: false
});
