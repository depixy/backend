import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";
import { permissionSchema } from "./permission.js";

export const roleDetailSchema = Type.Object({
  id: uuidSchema(),
  name: Type.String(),
  editable: Type.Boolean(),
  deletable: Type.Boolean(),
  permissions: Type.Array(permissionSchema)
}, {
  title: "Role Detail",
  additionalProperties: false
});
