import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "../scalar/index.js";

export const accessTokenSchema = Type.Object({ expiredAt: dateTimeSchema });
