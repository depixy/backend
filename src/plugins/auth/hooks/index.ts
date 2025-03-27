import { onRoute } from "./on-route.js";
import type { FastifyInstance } from "fastify";
import type { AppAbility } from "#plugins/auth/ability";

type CanParameters = Parameters<AppAbility["can"]>;

export function addHooks(app: FastifyInstance): void {
  app.addHook("onRoute", onRoute);
}

declare module "fastify" {
  interface RouteOptions extends AuthPluginRouteOptions {
  }

  interface RouteShorthandOptions extends AuthPluginRouteOptions {
  }

  interface FastifyContextConfig extends AuthPluginRouteOptions {

  }

  interface AuthPluginRouteOptions {
    ability?: {
      can?: CanParameters[];
    };
  }
}
