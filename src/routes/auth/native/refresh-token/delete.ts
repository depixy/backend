import { DateTime } from "luxon";
import { apiResponse, apiSuccess, emptyObjectSchema, refreshTokenDeleteInputSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addDeleteRoute(app: FastifyInstance): void {
  app.delete("/api/auth/native/refresh-token", {
    schema: {
      summary: "Delete refresh token",
      description: createSwaggerDescription(
        "Refresh tokens can only be deleted by their owners.",
        [["UserToken", "delete"]]
      ),
      tags: [Tags.authorization],
      body: refreshTokenDeleteInputSchema,
      response: apiResponse(apiSuccess(emptyObjectSchema))
    }
  }, async function (req, res) {
    const user = await req.getUserOrThrow();
    await req.assertAbility("UserToken", "delete");
    const { refreshTokens } = req.body;
    await this.db.userToken.deleteMany({
      where: {
        OR: [
          { id: { in: refreshTokens }, userId: user.id },
          { expiredAt: { lt: DateTime.utc().toJSDate() } }
        ]
      }
    });
    await res.status(StatusCodes.ok).send({ success: true, data: {} });
  });
}
