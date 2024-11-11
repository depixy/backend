import { Type } from "@sinclair/typebox";

export const pageInputSchema = Type.Number({ description: "Page number", minimum: 1 });
