import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { userDisplayNameSchema } from "./user-display-name.js";

export const userSchema = Type.Object({
  id: uuidSchema(),
  displayName: userDisplayNameSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
}, {
  title: "User",
  additionalProperties: false
});
