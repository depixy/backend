import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";

export const userTokenSchema = Type.Object({
  id: uuidSchema(),
  description: Type.String(),
  expiredAt: dateTimeSchema
});
