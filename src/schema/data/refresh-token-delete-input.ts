import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const refreshTokenDeleteInputSchema = Type.Object({ refreshTokens: Type.Array(uuidSchema()) }, {
  title: "Refresh Token Delete Input",
  additionalProperties: false
});
