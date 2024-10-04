import * as register from "./register/index.js";

import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  register.addRoutes(app);
}
