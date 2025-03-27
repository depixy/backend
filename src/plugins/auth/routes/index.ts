import { addLoginUserRoute } from "./login-user.js";
import type { FastifyBaseLogger, FastifyPluginAsync } from "fastify";

export interface AuthRoutesOptions {
  defaultExpiryDays: number;
  logger: FastifyBaseLogger;
}

export const routes: FastifyPluginAsync<AuthRoutesOptions> = async (app, opts) => {
  const { defaultExpiryDays } = opts;
  addLoginUserRoute(app, { defaultExpiryDays });
};
