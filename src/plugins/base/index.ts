import fp from "fastify-plugin";
import { decorateReply } from "./reply/index.js";
import type { Bindings } from "pino";

const name = "#plugins/base";

export type BasePluginOptions = {

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;
};

export default fp<BasePluginOptions>(
  async (app, opts) => {
    const { logBindings = { plugin: name } } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    await decorateReply(app, logger);
  },
  {
    dependencies: [],
    fastify: "5.x",
    name
  }
);
