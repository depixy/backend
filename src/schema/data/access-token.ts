import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";

export const accessTokenSchema = Type.Object({ expiredAt: dateTimeSchema }, {
  additionalProperties: false,
  description: "Access token is used to authenticate API.",
  title: "Access Token"
});
