import { Type } from "@sinclair/typebox";

export const displayNameSchema = Type.String({ title: "Display Name", minLength: 3, maxLength: 32 });
