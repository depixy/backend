import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const roleSchema = Type.Object({
  deletable: Type.Boolean(),
  editable: Type.Boolean(),
  id: uuidSchema(),
  name: Type.String()
}, {
  additionalProperties: false,
  title: "Role"
});
