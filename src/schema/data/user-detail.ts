import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { roleDetailSchema } from "./role-detail.js";
import { userDisplayNameSchema } from "./user-display-name.js";

export const userDetailSchema = Type.Object({
  createdAt: dateTimeSchema,
  displayName: userDisplayNameSchema,
  id: uuidSchema(),
  role: roleDetailSchema,
  updatedAt: dateTimeSchema
}, {
  additionalProperties: false,
  title: "User Detail"
});
