import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "../scalar/index.js";

export const refreshTokenSchema = Type.Object({ expiredAt: dateTimeSchema });
