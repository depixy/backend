import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";
import { permissionSchema } from "./permission.js";

export const roleDetailSchema = Type.Object({
  deletable: Type.Boolean(),
  editable: Type.Boolean(),
  id: uuidSchema(),
  name: Type.String(),
  permissions: Type.Array(permissionSchema)
}, {
  additionalProperties: false,
  title: "Role Detail"
});
