import { ForbiddenError } from "@casl/ability";
import fp from "fastify-plugin";
import { HttpError } from "#plugins/error";
import { addDeclarations } from "./declarations/index.js";
import { addHooks } from "./hooks/index.js";
import { routes } from "./routes/index.js";
import type { Bindings } from "pino";

const name = "@joshuaavalon/fastify-plugin-auth";

export type AuthPluginOptions = {
  defaultExpiryDays: number;

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;
};

export default fp<AuthPluginOptions>(
  async (app, opts) => {
    const { defaultExpiryDays, logBindings = { plugin: name } } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    addDeclarations(app);
    addHooks(app);
    await app.register(routes, { defaultExpiryDays, logger, prefix: "/api/auth" });
    app.addErrorFormatter(async err => {
      if (!(err instanceof ForbiddenError)) {
        return null;
      }
      return HttpError.forbidden({ cause: err });
    });
  },
  {
    dependencies: ["#plugins/error", "@fastify/cookie", "@fastify/secure-session"],
    fastify: "5.x",
    name
  }
);

declare module "@fastify/secure-session" {
  interface SessionData {
    userToken?: string;
  }
}
