import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const roleSchema = Type.Object({
  id: uuidSchema(),
  name: Type.String(),
  editable: Type.Boolean(),
  deletable: Type.Boolean()
}, {
  title: "Role",
  additionalProperties: false
});
