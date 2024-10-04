import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "../scalar/index.js";

export const userTokenSchema = Type.Object({
  id: uuidSchema(),
  description: Type.String(),
  expiredAt: dateTimeSchema
});
