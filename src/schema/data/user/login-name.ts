import { Type } from "@sinclair/typebox";

export const loginNameSchema = Type.String({ title: "Login Name", minLength: 3, maxLength: 32 });
