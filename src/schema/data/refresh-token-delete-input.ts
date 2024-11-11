import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const refreshTokenDeleteInputSchema = Type.Object({ refreshTokens: Type.Array(uuidSchema()) }, {
  additionalProperties: false,
  title: "Refresh Token Delete Input"
});
