import { addCreateTagCategoryRoute } from "./create-tag-category.js";
import { addGetTagCategoryRoute } from "./get-tag-category.js";
import { addGetUserRoute } from "./get-user.js";
import { addInitializationRoute } from "./initialization.js";
import { addRegisterUserRoute } from "./register-user.js";
import { addSearchTagCategoriesRoute } from "./search-tag-categories.js";
import { addUpdateTagCategoryRoute } from "./update-tag-category.js";
import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  addInitializationRoute(app);
  addGetUserRoute(app);
  addRegisterUserRoute(app);
  addGetTagCategoryRoute(app);
  addCreateTagCategoryRoute(app);
  addUpdateTagCategoryRoute(app);
  addSearchTagCategoriesRoute(app);
}
