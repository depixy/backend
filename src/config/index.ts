import { Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import config from "config";
import { InvalidInputError } from "#error";
import { logging } from "./logging.js";

import { network } from "./network.js";
import type { Static } from "@sinclair/typebox";

export const schema = Type.Object({
  logging,
  network
}, {
  $schema: "http://json-schema.org/draft-07/schema",
  $id: "https://raw.githubusercontent.com/depixy/backend/refs/heads/master/config/config.schema.json",
  title: "Depixy Backend Configuration"
});

export type Config = Static<typeof schema>;

export async function readConfig(): Promise<Config> {
  const validator = TypeCompiler.Compile(schema);
  if (!validator.Check(config)) {
    const nodeConfigEnv = config.util.getEnv("NODE_CONFIG_ENV");
    throw InvalidInputError.typebox(validator.Errors(config), `Invalid configuration (${nodeConfigEnv})`);
  }
  return config;
}
