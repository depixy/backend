import { PrismaClient } from "@prisma/client";
import fp from "fastify-plugin";

const name = "#plugins/database";

interface DatabasePluginOptions {
  datasourceUrl: string;
  logLevel: "debug" | "error" | "info" | "silent" | "warn";
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
        const { duration, params, query } = e;
        app.log.debug({ duration, params, query });
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
    if (["debug", "error", "info", "warn"].includes(logLevel)) {
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
    decorators: {},
    fastify: "5.x",
    name
  }
);

declare module "fastify" {
  interface FastifyInstance {
    db: PrismaClient;
  }
}
