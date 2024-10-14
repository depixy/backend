import { Type } from "@sinclair/typebox";

export const pageInputSchema = Type.Number({ minimum: 1, description: "Page number" });
