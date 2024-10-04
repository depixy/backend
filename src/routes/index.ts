import * as auth from "./auth/index.js";
import * as user from "./user/index.js";

import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  auth.addRoutes(app);
  user.addRoutes(app);
}
