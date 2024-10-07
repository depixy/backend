import { httpError } from "#error";
import { StatusCodes } from "#utils";
import { abilitySymbol } from "./ability-symbol.js";

import type { FastifyRequest } from "fastify";
import type { AppAbility } from "./define-ability-for.js";

export async function getAbility(this: FastifyRequest): Promise<AppAbility> {
  if (this[abilitySymbol]) {
    return this[abilitySymbol];
  }
  const user = await this.getUser();
  const role = user
    ? await this.server.db.role.findUnique({ include: { permissions: true }, where: { id: user.roleId } })
    : await this.server.db.role.findUnique({ include: { permissions: true }, where: { name: "Guest" } });
  if (!role) {
    throw httpError(StatusCodes.internalServerError, `Unable to find role (${user?.roleId ?? null})`);
  }
  const ability = this.defineAbilityFor(role);
  this[abilitySymbol] = ability;
  return ability;
}
