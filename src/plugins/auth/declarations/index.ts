import { decorateAbility } from "./ability.js";
import { decoratePassword } from "./password.js";
import { decorateUser } from "./user.js";
import type { FastifyInstance } from "fastify";

export function addDeclarations(app: FastifyInstance): void {
  decorateUser(app);
  decoratePassword(app);
  decorateAbility(app);
}
