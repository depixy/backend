import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

import type { Config } from "#config";

const name = "#plugins/database";

export const databasePlugin = fp<Config>(
  async (app, opts) => {
    const { database, logging } = opts;
    const db = new PrismaClient({
      datasourceUrl: database.url,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" }
      ]
    });
    if (logging.content.database === "debug") {
      db.$on("query", e => {
        const { query, params, duration } = e;
        app.log.debug({ query, params, duration });
      });
    }
    if (["debug", "info"].includes(logging.content.database)) {
      db.$on("info", e => {
        app.log.info(e.message);
      });
    }
    if (["debug", "info", "warn"].includes(logging.content.database)) {
      db.$on("warn", e => {
        app.log.info(e.message);
      });
    }
    if (["debug", "info", "warn", "error"].includes(logging.content.database)) {
      db.$on("error", e => {
        app.log.info(e.message);
      });
    }
    app.decorate("db", db);
    app.addHook("onClose", async app => {
      await app.db.$disconnect();
    });
  },
  {
    name,
    fastify: "4.x",
    decorators: {}
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
