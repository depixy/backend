import { randomUUID } from "node:crypto";
import cookiePlugin from "@fastify/cookie";
import sessionPlugin from "@fastify/secure-session";
import typeboxPlugin from "@joshuaavalon/fastify-plugin-typebox";
import fastify from "fastify";
import { authPlugin } from "#plugins/auth";
import { databasePlugin } from "#plugins/database";
import { addRoutes } from "#routes";
import { errorFormatter, errorHandler, notFoundHandler } from "./error.js";
import { parseQueryString } from "./qs.js";
import { initSwagger } from "./swagger.js";

import type { Session } from "@fastify/secure-session";
import type { FastifyInstance } from "fastify";
import type { Config } from "#config";

/**
 * Generate unique request id
 */
function genReqId(): string {
  return randomUUID();
}

export async function createApp(cfg: Config): Promise<FastifyInstance> {
  const app = await fastify({
    logger: { level: cfg.logging.level },
    genReqId,
    querystringParser: parseQueryString,
    trustProxy: cfg.network.trustProxy,
    disableRequestLogging: true,
    pluginTimeout: 120000
  });
  app.setNotFoundHandler(notFoundHandler)
    .setErrorHandler(errorHandler)
    .setSchemaErrorFormatter(errorFormatter);
  app.decorate("config", cfg);
  await app.register(typeboxPlugin);
  await app.register(databasePlugin, {
    datasourceUrl: cfg.database.url,
    logLevel: cfg.logging.database
  });
  await app.register(cookiePlugin);
  await app.register(sessionPlugin, [{
    secret: cfg.session.secret,
    salt: cfg.session.salt,
    sessionName: "refreshSession",
    expiry: cfg.session.expiry,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: "auto",
      maxAge: cfg.session.expiry
    }
  }, {
    secret: cfg.session.secret,
    salt: cfg.session.salt,
    sessionName: "session",
    expiry: 300,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: "auto",
      maxAge: 300
    }
  }]);
  await app.register(authPlugin);
  await initSwagger(app);
  addRoutes(app);
  return app;
}

declare module "fastify" {
  interface RefreshSession {
    userTokenId: string;
  }

  interface FastifyRequest {
    refreshSession: Session<RefreshSession>;
  }

  interface FastifyInstance {
    config: Config;
  }
}
