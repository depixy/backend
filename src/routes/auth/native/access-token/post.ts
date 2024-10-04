import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";

import { apiSuccess, apiResponse, accessTokenSchema } from "#schema";
import { StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const paramsSchema = Type.Object({ }, { additionalProperties: false });

const bodySchema = Type.Object({ }, { additionalProperties: false });

const responseSchema = apiSuccess(accessTokenSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/access-token", {
    schema: {
      summary: "Create access token",
      description: "Create access token with given credentials. Access token is return in cookie.",
      tags: ["Authorization"],
      params: paramsSchema,
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async (req, res) => {
    const refreshToken = req.refreshSession.get("userTokenId");
    req.session.set("userTokenId", refreshToken);
    res.status(StatusCodes.ok).send({
      success: true,
      data: { expiredAt: DateTime.now().plus({ seconds: 300 }).toJSDate() }
    });
  });
}
