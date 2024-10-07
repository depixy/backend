import { userSymbol } from "./user-symbol.js";

import type { User } from "@prisma/client";
import type { FastifyRequest } from "fastify";

export async function setUser(this: FastifyRequest, user: User): Promise<void> {
  this[userSymbol] = user;
}
