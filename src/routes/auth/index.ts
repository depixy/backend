import * as native from "./native/index.js";

import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  native.addRoutes(app);
}
