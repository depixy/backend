import { Type } from "@sinclair/typebox";

export const refreshTokenDescriptionSchema = Type.String({
  maxLength: 100,
  title: "Refresh Token Description"
});
