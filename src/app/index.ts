import { randomUUID } from "node:crypto";
import fastify from "fastify";
import basePlugin from "#plugins/base";
import databasePlugin from "#plugins/database";
import errorPlugin from "#plugins/error";
import networkPlugin from "#plugins/network";
import storagePlugin from "#plugins/storage";
import swaggerPlugin from "#plugins/swagger";
import typeboxPlugin from "#plugins/typebox";
import { addRoutes } from "#routes";
import { initAuthPlugin } from "./init-auth-plugin.js";
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
  app.decorate("config", cfg);
  app.addHook("onRequest", async req => {
    req.log.info({ req }, "incoming request");
  });
  await app.register(basePlugin);
  await app.register(errorPlugin);
  await app.register(typeboxPlugin);
  await app.register(storagePlugin, { storage: cfg.storage });
  await app.register(networkPlugin, cfg.network);
  await app.register(databasePlugin, cfg.database);
  await initAuthPlugin(app, cfg);
  await app.register(swaggerPlugin, {
    description: swaggerDescription,
    title: "Depixy API",
    version: "1.0.0"
  });
  addRoutes(app);
  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
  }
}
