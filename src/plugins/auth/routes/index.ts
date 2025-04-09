import { addLoginUserRoute } from "./login-user.js";
import { addLogoutUserRoute } from "./logout-user.js";
import type { FastifyPluginAsync } from "fastify";

export interface AuthRoutesOptions {
  defaultExpiryDays: number;
}

export const routes: FastifyPluginAsync<AuthRoutesOptions> = async (app, opts) => {
  const { defaultExpiryDays } = opts;
  addLoginUserRoute(app, { defaultExpiryDays });
  addLogoutUserRoute(app);
};
