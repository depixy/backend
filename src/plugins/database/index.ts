import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

const name = "#plugins/database";

interface DatabasePluginOptions {
  datasourceUrl: string;
  logLevel: "debug" | "info" | "warn" | "error" | "silent";
}

export const databasePlugin = fp<DatabasePluginOptions>(
  async (app, opts) => {
    const { datasourceUrl, logLevel } = opts;
    const db = new PrismaClient({
      datasourceUrl,
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" }
      ]
    });
    if (logLevel === "debug") {
      db.$on("query", e => {
        const { query, params, duration } = e;
        app.log.debug({ query, params, duration });
      });
    }
    if (["debug", "info"].includes(logLevel)) {
      db.$on("info", e => {
        app.log.info(e.message);
      });
    }
    if (["debug", "info", "warn"].includes(logLevel)) {
      db.$on("warn", e => {
        app.log.info(e.message);
      });
    }
    if (["debug", "info", "warn", "error"].includes(logLevel)) {
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
    fastify: "5.x",
    decorators: {}
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
