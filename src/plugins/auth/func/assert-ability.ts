import { httpError } from "#error";
import { StatusCodes } from "#utils";

import type { FastifyRequest } from "fastify";
import type { Action, Subject } from "./define-ability-for.js";

export async function assertAbility(this: FastifyRequest, subject: Subject, action: Action): Promise<void> {
  const ability = await this.getAbility();
  if (!ability.can(action, subject)) {
    throw httpError(StatusCodes.forbidden, `Insufficient permission (${subject}, ${action})`);
  }
}
