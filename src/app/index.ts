import { randomUUID } from "node:crypto";
import cookiePlugin from "@fastify/cookie";
import sessionPlugin from "@fastify/secure-session";
import fastify from "fastify";
import { authPlugin } from "#plugins/auth";
import databasePlugin from "#plugins/database";
import networkPlugin from "#plugins/network";
import swaggerPlugin from "#plugins/swagger";
import typeboxPlugin from "#plugins/typebox";
import { addRoutes } from "#routes";
import { errorFormatter, errorHandler, notFoundHandler } from "./error.js";
import type { Session } from "@fastify/secure-session";
import type { FastifyInstance } from "fastify";
import type { Config } from "#config";

const swaggerDescription = `
Swagger for Depixy API
`;

/**
 * Generate unique request id
 */
function genReqId(): string {
  return randomUUID();
}

export async function createApp(cfg: Config): Promise<FastifyInstance> {
  const app = await fastify({
    disableRequestLogging: true,
    genReqId,
    logger: {
      level: cfg.logging.level,
      redact: ["req.headers.authorization", "req.headers.cookie"],
      serializers: {
        req(request) {
          return {
            headers: request.headers,
            host: request.host,
            method: request.method,
            remoteAddress: request.ip,
            remotePort: request.socket.remotePort,
            url: request.url
          };
        }
      },
      transport: cfg.logging.format === "pretty"
        ? {
          options: { colorize: true },
          target: "pino-pretty"
        }
        : undefined
    },
    pluginTimeout: 120000,
    trustProxy: cfg.network.trustProxy
  });
  app.setNotFoundHandler(notFoundHandler)
    .setErrorHandler(errorHandler)
    .setSchemaErrorFormatter(errorFormatter);
  app.decorate("config", cfg);
  app.addHook("onRequest", async req => {
    req.log.info({ req }, "incoming request");
  });
  await app.register(networkPlugin, cfg.network);
  await app.register(databasePlugin, cfg.database);
  await app.register(typeboxPlugin);
  await app.register(cookiePlugin);
  await app.register(sessionPlugin, [{
    cookie: {
      httpOnly: true,
      maxAge: cfg.session.expiry,
      path: "/",
      sameSite: "strict",
      secure: "auto"
    },
    expiry: cfg.session.expiry,
    salt: cfg.session.salt,
    secret: cfg.session.secret,
    sessionName: "refreshSession"
  }, {
    cookie: {
      httpOnly: true,
      maxAge: 300,
      path: "/",
      sameSite: "strict",
      secure: "auto"
    },
    expiry: 300,
    salt: cfg.session.salt,
    secret: cfg.session.secret,
    sessionName: "session"
  }]);
  await app.register(authPlugin);
  await app.register(swaggerPlugin, {
    description: swaggerDescription,
    title: "Depixy API",
    version: "1.0.0"
  });
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
