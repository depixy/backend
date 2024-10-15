import { Type } from "@sinclair/typebox";
import { emailSchema } from "#schema/scalar";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { refreshTokenSchema } from "./refresh-token.js";
import { roleDetailSchema } from "./role-detail.js";
import { userDisplayNameSchema } from "./user-display-name.js";
import { userLoginNameSchema } from "./user-login-name.js";

export const userPrivateDetailSchema = Type.Object({
  id: uuidSchema(),
  loginName: userLoginNameSchema,
  displayName: userDisplayNameSchema,
  email: emailSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
  role: roleDetailSchema,
  tokens: Type.Array(refreshTokenSchema)
}, {
  title: "User Private Detail",
  additionalProperties: false
});
