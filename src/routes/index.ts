import * as init from "./init/index.js";
import * as tagCategory from "./tag-category/index.js";
import * as user from "./user/index.js";
import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  init.addRoutes(app);
  tagCategory.addRoutes(app);
  user.addRoutes(app);
}
