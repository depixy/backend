import { defineAbilityFor } from "#plugins/auth/ability";
import type { FastifyInstance, FastifyRequest } from "fastify";
import type { AppAbility } from "#plugins/auth/ability";

const abilitySymbol = Symbol("Ability");

async function getAbility(this: FastifyRequest): Promise<AppAbility> {
  if (this[abilitySymbol]) {
    return this[abilitySymbol];
  }
  const user = await this.getUser();
  const ability = defineAbilityFor(user);
  this[abilitySymbol] = ability;
  return ability;
}

export function decorateAbility(app: FastifyInstance): void {
  app.decorateRequest(abilitySymbol, null);
  app.decorateRequest("getAbility", getAbility);
}

declare module "fastify" {
  interface FastifyRequest {
    [abilitySymbol]: AppAbility | null;
    getAbility: OmitThisParameter<typeof getAbility>;
  }
}
