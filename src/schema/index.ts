import type { StaticDecode, TSchema } from "@sinclair/typebox";

export * from "./basic/index.js";
export * from "./data/index.js";
export * from "./scalar/index.js";

declare module "fastify" {
  interface FastifyTypeProviderDefault {
    serializer: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
    validator: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
  }
}
