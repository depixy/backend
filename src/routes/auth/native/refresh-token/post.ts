import { DateTime } from "luxon";
import { httpError } from "#error";
import {
  apiResponse,
  apiSuccess,
  refreshTokenCreateInputSchema,
  refreshTokenSchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const bodySchema = refreshTokenCreateInputSchema;

const responseSchema = apiSuccess(refreshTokenSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/refresh-token", {
    schema: {
      body: bodySchema,
      description: createSwaggerDescription(
        "Create refresh token with access token. Refresh token is return in cookie.",
        [["UserToken", "create"]]
      ),
      response: apiResponse(responseSchema),
      summary: "Create refresh token",
      tags: [Tags.authorization]
    }
  }, async function (req, res) {
    const { description = "", loginName, password } = req.body;
    const user = await this.db.user.findUnique({ where: { loginName } });
    if (!user) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    const isPasswordValid = await this.verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    req.setUser(user);
    await req.assertAbility("UserToken", "create");
    await this.db.userToken.deleteMany({ where: { expiredAt: { lt: DateTime.utc().toJSDate() } } });
    const data = await this.db.userToken.create({
      data: {
        description,
        expiredAt: DateTime.utc().plus({ seconds: this.config.session.expiry }).toJSDate(),
        userId: user.id
      }
    });
    req.refreshSession.set("userTokenId", data.id);
    req.session.set("userTokenId", data.id);
    await res.status(StatusCodes.ok).send({ data, success: true });
  });
}
