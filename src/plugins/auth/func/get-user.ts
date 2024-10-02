import { userSymbol } from "./user-symbol.js";

import type { User } from "@prisma/client";
import type { FastifyRequest } from "fastify";

export async function getUser(this: FastifyRequest): Promise<User | null> {
  if (this[userSymbol]) {
    return this[userSymbol];
  }
  const { userId } = this.session;
  if (!userId) {
    return null;
  }
  const user = await this.server.db.user.findUnique({ where: { id: userId } });
  if (!user) {
    return null;
  }
  this[userSymbol] = user;
  return user;
}
