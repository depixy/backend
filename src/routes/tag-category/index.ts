import { addGetRoute } from "./get.js";
import { addIdRoute } from "./id.js";
import { addPostRoute } from "./post.js";
import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  addGetRoute(app);
  addIdRoute(app);
  addPostRoute(app);
}
