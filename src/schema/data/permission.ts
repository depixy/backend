import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";
import { permissionActionSchema } from "./permission-action.js";
import { permissionSubjectSchema } from "./permission-subject.js";

export const permissionSchema = Type.Object({
  id: uuidSchema(),
  subject: permissionSubjectSchema,
  action: permissionActionSchema
}, {
  title: "Permission",
  additionalProperties: false
});
