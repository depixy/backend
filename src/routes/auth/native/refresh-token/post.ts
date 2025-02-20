import { DateTime } from "luxon";
import { HttpError } from "#plugins/error";
import {
  apiResponse,
  apiSuccess,
  refreshTokenCreateInputSchema,
  refreshTokenSchema
} from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

const bodySchema = refreshTokenCreateInputSchema;

const responseSchema = apiSuccess(refreshTokenSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/refresh-token", {
    schema: {
      body: bodySchema,
      description: "Create refresh token with access token. Refresh token is return in cookie.",
      response: apiResponse(responseSchema),
      summary: "Create refresh token",
      tags: [Tags.authorization]
    }
  }, async function (req, res) {
    const { description = "", loginName, password } = req.body;
    const user = await this.db.user.findUnique({ where: { loginName } });
    if (!user) {
      throw HttpError.forbidden({ message: "Invalid loginName or password" });
    }
    const isPasswordValid = await this.password.verify(Buffer.from(user.passwordHash), password);
    if (!isPasswordValid) {
      throw HttpError.forbidden({ message: "Invalid loginName or password" });
    }
    await req.auth.can("create", "UserToken");
    await this.db.userToken.deleteMany({ where: { expiredAt: { lt: DateTime.utc().toJSDate() } } });
    const data = await req.auth.authenticate(user, { description });
    await res.status(200).send({ data, success: true });
  });
}
