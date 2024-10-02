import { httpError } from "#error";
import { StatusCodes } from "#utils";

import type { User } from "@prisma/client";
import type { FastifyRequest } from "fastify";

export async function getUserOrThrow(this: FastifyRequest): Promise<User> {
  const user = await this.getUser();
  if (!user) {
    throw httpError(StatusCodes.forbidden, "Request is not authorized");
  }
  return user;
}
