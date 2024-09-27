import { randomUUID } from "node:crypto";
import typeboxPlugin from "@joshuaavalon/fastify-plugin-typebox";
import fastify from "fastify";
import { errorFormatter, errorHandler, notFoundHandler } from "./error.js";
import { parseQueryString } from "./qs.js";

import type { FastifyInstance, RawRequestDefaultExpression, RawServerBase } from "fastify";
import type { Config } from "#config";

/**
 * Generate unique request id
 */
function genReqId(_req: RawRequestDefaultExpression<RawServerBase>): string {
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
  await app.register(typeboxPlugin);
  return app;
}
