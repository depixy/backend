import { Type } from "@sinclair/typebox";
import { dateTimeSchema, uuidSchema } from "#schema/scalar";
import { userDisplayNameSchema } from "./user-display-name.js";

export const userSchema = Type.Object({
  createdAt: dateTimeSchema,
  displayName: userDisplayNameSchema,
  id: uuidSchema(),
  updatedAt: dateTimeSchema
}, {
  additionalProperties: false,
  title: "User"
});
