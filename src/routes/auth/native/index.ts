import * as accessToken from "./access-token/index.js";

import type { FastifyInstance } from "fastify";

export function addRoutes(app: FastifyInstance): void {
  accessToken.addRoutes(app);
}
