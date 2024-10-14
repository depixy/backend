import { Type } from "@sinclair/typebox";

export const sizeInputSchema = Type.Number({ minimum: 1, maximum: 100, description: "Size per page" });
