import { Argon2PasswordHandler } from "./argon2-handler.js";
import type { FastifyInstance } from "fastify";
import type { PasswordHandler } from "./type.js";
export type * from "./type.js";


export type PasswordAlgorithm = "Argon2";

export async function initPasswordHandler(app: FastifyInstance, algorithm: PasswordAlgorithm): Promise<void> {
  let passwordHandler: PasswordHandler;
  switch (algorithm) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case "Argon2":
      passwordHandler = new Argon2PasswordHandler();
      break;
    default:
      throw new Error(`Unknown password algorithm (${algorithm})`);
  }
  app.decorate("passwordHandler", passwordHandler);
}
