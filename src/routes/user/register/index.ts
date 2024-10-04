import { addPostRoute } from "./post.js";

import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  addPostRoute(app);
}
