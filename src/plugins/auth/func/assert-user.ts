import type { FastifyRequest } from "fastify";

export async function assertUser(this: FastifyRequest): Promise<void> {
  this.getUserOrThrow();
}
