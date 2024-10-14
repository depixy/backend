import { Type } from "@sinclair/typebox";
import { uuidSchema } from "#schema/scalar";

export const tagUniqueWhereSchema = Type.Union([
  Type.Object({ id: uuidSchema() }),
  Type.Object({ name: Type.String() })
]);
