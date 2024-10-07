import { assertAbility } from "./assert-ability.js";
import { assertUser } from "./assert-user.js";
import { defineAbilityFor } from "./define-ability-for.js";
import { getAbility } from "./get-ability.js";
import { getUserOrThrow } from "./get-user-or-throw.js";
import { getUser } from "./get-user.js";
import { hashPassword } from "./hash-password.js";
import { setUser } from "./set-user.js";
import { userSymbol } from "./user-symbol.js";
import { verifyPassword } from "./verify-password.js";

import type { User } from "@prisma/client";
import type { FastifyInstance } from "fastify";
import type { abilitySymbol } from "./ability-symbol.js";
import type { AppAbility } from "./define-ability-for.js";

export function addFunctions(app: FastifyInstance): void {
  app.decorateRequest(userSymbol);
  app.decorateRequest("defineAbilityFor", defineAbilityFor);
  app.decorateRequest("getAbility", getAbility);
  app.decorateRequest("assertAbility", assertAbility);
  app.decorateRequest("getUser", getUser);
  app.decorateRequest("getUserOrThrow", getUserOrThrow);
  app.decorateRequest("assertUser", assertUser);
  app.decorateRequest("setUser", setUser);
  app.decorate("hashPassword", hashPassword);
  app.decorate("verifyPassword", verifyPassword);
}

declare module "fastify" {
  interface FastifyRequest {
    assertAbility: OmitThisParameter<typeof assertAbility>;
    assertUser: OmitThisParameter<typeof assertUser>;
    defineAbilityFor: OmitThisParameter<typeof defineAbilityFor>;
    getAbility: OmitThisParameter<typeof getAbility>;
    getUser: OmitThisParameter<typeof getUser>;
    getUserOrThrow: OmitThisParameter<typeof getUserOrThrow>;
    setUser: OmitThisParameter<typeof setUser>;
  }

  interface FastifyInstance {
    hashPassword: OmitThisParameter<typeof hashPassword>;
    verifyPassword: OmitThisParameter<typeof verifyPassword>;
  }

  interface FastifyRequest {
    [userSymbol]?: User;
    [abilitySymbol]?: AppAbility;
  }
}
