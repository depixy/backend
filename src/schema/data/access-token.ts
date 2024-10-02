import { Type } from "@sinclair/typebox";
import { uuidSchema, dateTimeSchema } from "../scalar/index.js";

export const accessTokenSchema = Type.Object({ id: uuidSchema(), expiredAt: dateTimeSchema });
