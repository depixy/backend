import type { TSchema, StaticDecode } from "@sinclair/typebox";

export * from "./basic/index.js";
export * from "./data/index.js";
export * from "./scalar/index.js";

declare module "fastify" {
  interface FastifyTypeProviderDefault {
    validator: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
    serializer: this["schema"] extends TSchema ? StaticDecode<this["schema"]> : unknown;
  }
}
