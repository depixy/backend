import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const idParamSchema = Type.Object({ id: uuidSchema() }, { additionalProperties: false });
