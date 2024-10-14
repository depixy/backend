import { Type } from "@sinclair/typebox";
import { hexColorSchema } from "../../basic/index.js";
import { dateTimeSchema, uuidSchema } from "../../scalar/index.js";
import { tagSchema } from "../tag/entity.js";
import { tagCategoryNameSchema } from "./tag-category-name.js";

export const tagCategoryDetailSchema = Type.Object({
  id: uuidSchema(),
  name: tagCategoryNameSchema,
  color: hexColorSchema,
  tags: Type.Array(tagSchema),
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema
}, { additionalProperties: false });
