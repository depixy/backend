import { httpError } from "#error";
import { StatusCodes } from "#utils";
import type { FastifyRequest } from "fastify";
import type { PermissionAction, PermissionSubject } from "#schema/data";

export async function assertAbility(this: FastifyRequest, subject: PermissionSubject, action: PermissionAction): Promise<void> {
  const ability = await this.getAbility();
  if (!ability.can(action, subject)) {
    throw httpError(StatusCodes.forbidden, `Insufficient permission (${subject}, ${action})`);
  }
}
