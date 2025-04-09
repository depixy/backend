import { addCreateTagCategoryRoute } from "./create-tag-category.js";
import { addGetTagCategoryRoute } from "./get-tag-category.js";
import { addInitializationRoute } from "./initialization.js";
import { addSearchTagCategoriesRoute } from "./search-tag-categories.js";
import { addUpdateTagCategoryRoute } from "./update-tag-category.js";
import * as user from "./user/index.js";
import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  user.addRoutes(app);
  addInitializationRoute(app);
  addGetTagCategoryRoute(app);
  addCreateTagCategoryRoute(app);
  addUpdateTagCategoryRoute(app);
  addSearchTagCategoriesRoute(app);
}
