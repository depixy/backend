import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "../scalar/index.js";
import { userTokenSchema } from "./user-token.js";

export const userDetailSchema = Type.Object({
  id: uuidSchema(),
  loginName: Type.String(),
  displayName: Type.String(),
  email: Type.String(),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  tokens: Type.Array(userTokenSchema)
});
