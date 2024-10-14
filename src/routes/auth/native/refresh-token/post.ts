import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import { httpError } from "#error";
import {
  apiResponse,
  apiSuccess,
  loginNameSchema,
  passwordSchema,
  refreshTokenSchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const bodySchema = Type.Object({
  loginName: loginNameSchema,
  password: passwordSchema,
  description: Type.Optional(Type.String({ maxLength: 50 }))
}, { additionalProperties: false });

const responseSchema = apiSuccess(refreshTokenSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/refresh-token", {
    schema: {
      summary: "Create refresh token",
      description: createSwaggerDescription(
        "Create refresh token with access token. Refresh token is return in cookie.",
        [["UserToken", "create:self"]]
      ),
      tags: [Tags.authorization],
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    const { loginName, password, description = "" } = req.body;
    const user = await this.db.user.findUnique({ where: { loginName } });
    if (!user) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    const isPasswordValid = await this.verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    req.setUser(user);
    await req.assertAbility("UserToken", "create:self");
    await this.db.userToken.deleteMany({ where: { expiredAt: { lt: DateTime.now().toJSDate() } } });
    const data = await this.db.userToken.create({
      data: {
        userId: user.id,
        description,
        expiredAt: DateTime.now().plus({ seconds: this.config.session.expiry }).toJSDate()
      }
    });
    req.refreshSession.set("userTokenId", data.id);
    req.session.set("userTokenId", data.id);
    await res.status(StatusCodes.ok).send({ success: true, data });
  });
}
