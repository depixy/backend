import { Type } from "@sinclair/typebox";

export const sizeInputSchema = Type.Number({ description: "Size per page", maximum: 100, minimum: 1 });
