import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";
import { permissionActionSchema } from "./permission-action.js";
import { permissionSubjectSchema } from "./permission-subject.js";

export const permissionSchema = Type.Object({
  action: permissionActionSchema,
  id: uuidSchema(),
  subject: permissionSubjectSchema
}, {
  additionalProperties: false,
  title: "Permission"
});
