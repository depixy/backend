import { DateTime } from "luxon";
import { accessTokenSchema, apiResponse, apiSuccess } from "#schema";
import { Tags } from "#swagger";
import { StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/access-token", {
    schema: {
      summary: "Create access token",
      description: "Create access token with given credentials. Access token is return in cookie.",
      tags: [Tags.authorization],
      response: apiResponse(apiSuccess(accessTokenSchema))
    }
  }, async (req, res) => {
    const refreshToken = req.refreshSession.get("userTokenId");
    req.session.set("userTokenId", refreshToken);
    await res.status(StatusCodes.ok).send({
      success: true,
      data: { expiredAt: DateTime.utc().plus({ seconds: 300 }).toJSDate() }
    });
  });
}
