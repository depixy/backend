import fp from "fastify-plugin";
import { addParseIp } from "./parse-ip.js";
import type { Bindings } from "pino";

const name = "@joshuaavalon/fastify-plugin-network";

export type NetworkPluginOptions = {
  /**
   * Determine IP by custom header.
   * `fastify.trustProxy` is required to be `true`.
   */
  ipHeader?: string;

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;
  trustProxy: boolean;
};

export default fp<NetworkPluginOptions>(
  async (app, opts) => {
    const { ipHeader, trustProxy } = opts;
    addParseIp(app, { ipHeader, trustProxy });
  },
  {
    dependencies: [],
    fastify: "5.x",
    name
  }
);
