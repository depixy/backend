import { DateTime } from "luxon";
import { accessTokenSchema, apiResponse, apiSuccess } from "#schema";
import { Tags } from "#swagger";
import { StatusCodes } from "#utils";
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
    const refreshToken = req.refreshSession.get("userTokenId");
    req.session.set("userTokenId", refreshToken);
    await res.status(StatusCodes.ok).send({
      data: { expiredAt: DateTime.utc().plus({ seconds: 300 }).toJSDate() },
      success: true
    });
  });
}
