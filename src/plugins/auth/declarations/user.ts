import { DateTime } from "luxon";
import type { User } from "@prisma/client";
import type { FastifyInstance, FastifyRequest } from "fastify";

const userSymbol = Symbol("User");

async function getUser(this: FastifyRequest): Promise<User | null> {
  if (this[userSymbol] !== false) {
    return this[userSymbol];
  }

  const { userToken } = this.session;
  if (!userToken) {
    this[userSymbol] = null;
    return null;
  }

  const token = await this.server.db.userToken.findUnique({
    include: { user: true },
    where: { AND: [{ expiredAt: { gte: DateTime.utc().toJSDate() } }], id: userToken }
  });
  this[userSymbol] = token?.user ?? null;
  return this[userSymbol];
}

export function decorateUser(app: FastifyInstance): void {
  app.decorateRequest(userSymbol, false);
  app.decorateRequest("getUser", getUser);
}

declare module "fastify" {
  interface FastifyRequest {
    getUser: OmitThisParameter<typeof getUser>;
    [userSymbol]: User | false | null;
  }
}
