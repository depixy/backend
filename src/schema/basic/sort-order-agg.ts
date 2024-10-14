import { Type } from "@sinclair/typebox";
import { sortOrderSchema } from "./sort-order.js";

export const sortOrderAgg = Type.Object({ _count: Type.Optional(sortOrderSchema) });
