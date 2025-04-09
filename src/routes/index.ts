import { addInitializationRoute } from "./initialization.js";
import * as tagCategory from "./tag-category/index.js";
import * as user from "./user/index.js";
import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  tagCategory.addRoutes(app);
  user.addRoutes(app);
  addInitializationRoute(app);
}
