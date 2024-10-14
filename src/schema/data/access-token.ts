import { Type } from "@sinclair/typebox";
import { dateTimeSchema } from "#schema/scalar";

export const accessTokenSchema = Type.Object({ expiredAt: dateTimeSchema });
