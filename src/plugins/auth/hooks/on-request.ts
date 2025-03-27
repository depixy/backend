import { HttpError } from "#plugins/error";
import type { onRequestAsyncHookHandler } from "fastify";

export const onRequest: onRequestAsyncHookHandler = async function (req) {
  const { ability } = req.routeOptions.config;
  if (!ability) {
    return;
  }
  const { can: canParameters = [] } = ability;
  if (canParameters.length <= 0) {
    return;
  }
  const userAbility = await req.getAbility();
  for (const canParameter of canParameters) {
    if (!userAbility.can(...canParameter)) {
      throw HttpError.unauthorized();
    }
  }
};
