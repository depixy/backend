import { DateTime } from "luxon";
import { accessTokenSchema, apiResponse, apiSuccess } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/access-token", {
    schema: {
      description: "Create access token with given credentials. Access token is return in cookie.",
      response: apiResponse(apiSuccess(accessTokenSchema)),
      summary: "Create access token",
      tags: [Tags.authorization]
    }
  }, async (req, res) => {
    req.auth.setAccessToken();
    await res.status(200).send({
      data: { expiredAt: DateTime.utc().plus({ minutes: 5 }).toJSDate() },
      success: true
    });
  });
}
