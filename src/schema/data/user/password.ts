import { Type } from "@sinclair/typebox";

export const passwordSchema = Type.String({ title: "Password", minLength: 12, maxLength: 128 });
