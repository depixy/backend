import { Type } from "@sinclair/typebox";

export const refreshTokenDescriptionSchema = Type.String({
  title: "Refresh Token Description",
  maxLength: 100
});
