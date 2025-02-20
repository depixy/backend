import fp from "fastify-plugin";
import { setErrorHandler } from "./error-handler/index.js";
import type { Bindings } from "pino";

const name = "#plugins/error";

export type ErrorPluginOptions = {

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;
};

export default fp<ErrorPluginOptions>(
  async (app, opts) => {
    const { logBindings = { plugin: name } } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    await setErrorHandler(app, logger);
  },
  {
    dependencies: ["#plugins/base"],
    fastify: "5.x",
    name
  }
);

export type { ErrorFormatter } from "./error-handler/index.js";
export * from "./errors/index.js";
