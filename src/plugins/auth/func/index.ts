import { assertUser } from "./assert-user.js";
import { getUserOrThrow } from "./get-user-or-throw.js";
import { getUser } from "./get-user.js";
import { hashPassword } from "./hash-password.js";
import { userSymbol } from "./user-symbol.js";
import { verifyPassword } from "./verify-password.js";

import type { User } from "@prisma/client";
import type { FastifyInstance } from "fastify";

export function addFunctions(app: FastifyInstance): void {
  app.decorateRequest(userSymbol);
  app.decorateRequest("getUser", getUser);
  app.decorateRequest("getUserOrThrow", getUserOrThrow);
  app.decorateRequest("assertUser", assertUser);
  app.decorate("hashPassword", hashPassword);
  app.decorate("verifyPassword", verifyPassword);
}

declare module "fastify" {
  interface FastifyRequest {
    assertUser: OmitThisParameter<typeof assertUser>;
    getUser: OmitThisParameter<typeof getUser>;
    getUserOrThrow: OmitThisParameter<typeof getUserOrThrow>;
  }

  interface FastifyInstance {
    hashPassword: OmitThisParameter<typeof hashPassword>;
    verifyPassword: OmitThisParameter<typeof verifyPassword>;
  }

  interface FastifyRequest {
    [userSymbol]?: User;
  }
}
