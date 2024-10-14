import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";

export const refreshTokenSchema = Type.Object({ expiredAt: dateTimeSchema });
