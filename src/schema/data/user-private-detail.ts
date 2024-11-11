import { Type } from "@sinclair/typebox";
import { emailSchema } from "#schema/scalar";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { refreshTokenSchema } from "./refresh-token.js";
import { roleDetailSchema } from "./role-detail.js";
import { userDisplayNameSchema } from "./user-display-name.js";
import { userLoginNameSchema } from "./user-login-name.js";

export const userPrivateDetailSchema = Type.Object({
  createdAt: dateTimeSchema,
  displayName: userDisplayNameSchema,
  email: emailSchema,
  id: uuidSchema(),
  loginName: userLoginNameSchema,
  role: roleDetailSchema,
  tokens: Type.Array(refreshTokenSchema),
  updatedAt: dateTimeSchema
}, {
  additionalProperties: false,
  title: "User Private Detail"
});
