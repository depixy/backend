import { sendApi } from "./send-api.js";
import type { FastifyBaseLogger, FastifyInstance } from "fastify";

export async function decorateReply(app: FastifyInstance, logger: FastifyBaseLogger): Promise<void> {
  logger.debug("Decorate reply");
  app.decorateReply("sendApi", sendApi);
}

declare module "fastify" {
  interface FastifyReply {
    sendApi: OmitThisParameter<typeof sendApi>;
  }
}
