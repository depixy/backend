import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import { errorFormatter } from "./error-formatter.js";
import type { Bindings } from "pino";


export interface DatabasePluginOptions {

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;

  /**
   * Database connection string.
   * @defaultValue `url` in generated client.
   */
  url?: string;
}

export const name = "#plugins/database";


export default fp<DatabasePluginOptions>(
  async (app, opts) => {
    const { logBindings = { plugin: name }, url } = opts;
    const db = new PrismaClient({
      datasourceUrl: url,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" }
      ]
    });
    const logger = logBindings ? app.log.child(logBindings) : app.log;

    db.$on("query", event => {
      const { duration, params, query, target } = event;
      logger.debug({ duration, params, target }, query);
    });

    db.$on("info", event => {
      const { message, target } = event;
      logger.info({ target }, message);
    });

    db.$on("warn", event => {
      const { message, target } = event;
      logger.warn({ target }, message);
    });

    db.$on("error", event => {
      const { message, target } = event;
      logger.error({ target }, message);
    });

    app.decorate("db", db);
    app.addHook("onClose", async app => {
      await app.db.$disconnect();
    });
    app.addErrorFormatter(errorFormatter);
  },
  {
    dependencies: ["#plugins/error", "#plugins/typebox"],
    fastify: "5.x",
    name
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
