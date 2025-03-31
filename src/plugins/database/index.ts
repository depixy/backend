import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";
import { errorFormatter } from "./error-formatter.js";


export interface DatabasePluginOptions {
  /**
   * Database connection string.
   * @defaultValue `url` in generated client.
   */
  url?: string;
}

export const name = "#plugins/database";


export default fp<DatabasePluginOptions>(
  async (app, opts) => {
    const { url } = opts;
    const db = new PrismaClient({
      datasourceUrl: url,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" }
      ]
    });

    db.$on("query", event => {
      const { duration, params, query, target } = event;
      app.log.debug({ duration, params, target }, query);
    });

    db.$on("info", event => {
      const { message, target } = event;
      app.log.info({ target }, message);
    });

    db.$on("warn", event => {
      const { message, target } = event;
      app.log.warn({ target }, message);
    });

    db.$on("error", event => {
      const { message, target } = event;
      app.log.error({ target }, message);
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
