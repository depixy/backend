import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { userDisplayNameSchema } from "./user-display-name.js";

export const userDetailSchema = Type.Object({
  createdAt: dateTimeSchema,
  displayName: userDisplayNameSchema,
  id: uuidSchema(),
  role: Type.String(),
  updatedAt: dateTimeSchema
}, {
  additionalProperties: false,
  title: "User Detail"
});
