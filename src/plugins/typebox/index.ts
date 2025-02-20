import fp from "fastify-plugin";
import { schemaErrorFormatter } from "./schema-error-formatter.js";
import { serializerCompilerFactory } from "./serializer-compiler.js";
import { validatorCompilerFactory } from "./validator-compiler.js";
import type { StaticDecode, TSchema } from "@sinclair/typebox";
import type { Bindings } from "pino";

const name = "#plugins/typebox";

export type TypeboxPluginOptions = {

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;

  references?: TSchema[] | undefined;

  /**
   * Use `default` in schema.
   *
   * Default to `true`.
   */
  useDefault?: boolean;
};

export default fp<TypeboxPluginOptions>(
  async (app, opts) => {
    const {
      logBindings = { plugin: name },
      references = [],
      useDefault = true
    } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    app.setValidatorCompiler(validatorCompilerFactory({ logger, references, useDefault }));
    app.setSerializerCompiler(serializerCompilerFactory({ logger, references, useDefault }));
    app.setSchemaErrorFormatter(schemaErrorFormatter);
  },
  {
    dependencies: ["#plugins/error"],
    fastify: "5.x",
    name
  }
);

export * from "./errors/index.js";

declare module "fastify" {
  interface FastifyTypeProviderDefault {
    serializer: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
    validator: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
  }
}
