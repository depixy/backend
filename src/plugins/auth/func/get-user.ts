import { DateTime } from "luxon";
import { userSymbol } from "./user-symbol.js";

import type { User } from "@prisma/client";
import type { FastifyRequest } from "fastify";

export async function getUser(this: FastifyRequest): Promise<User | null> {
  if (this[userSymbol]) {
    return this[userSymbol];
  }
  const { userTokenId } = this.session;
  if (!userTokenId) {
    return null;
  }
  const userToken = await this.server.db.userToken.findUnique({
    include: { user: true },
    where: {
      id: userTokenId,
      expiredAt: { gte: DateTime.now().toJSDate() }
    }
  });
  if (!userToken) {
    return null;
  }
  this[userSymbol] = userToken.user;
  return userToken.user;
}
