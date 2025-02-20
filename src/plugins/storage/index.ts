import fp from "fastify-plugin";
import { createFastifyStorage } from "./storage/index.js";
import type { Bindings } from "pino";
import type { CreateStorageOptions, FastifyStorage } from "./storage/index.js";

export type { CreateStorageOptions, FastifyStorage, Storage, StorageOptions } from "./storage/index.js";

export type StoragePluginOptions = {

  /*
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;

  storage: CreateStorageOptions;
};

export const name = "#plugins/storage";

export default fp<StoragePluginOptions>(
  async (app, opts) => {
    const { logBindings = { plugin: name }, storage } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    app.decorate("storage", createFastifyStorage(storage, logger));
  },
  {
    decorators: {},
    dependencies: [],
    fastify: "5.x",
    name
  }
);

declare module "fastify" {
  interface FastifyInstance {
    storage: FastifyStorage;
  }
}
