import { accessibleBy } from "@casl/prisma";
import { DateTime } from "luxon";
import { apiResponse, apiSuccess, emptyObjectSchema, refreshTokenDeleteInputSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addDeleteRoute(app: FastifyInstance): void {
  app.delete("/api/auth/native/refresh-token", {
    schema: {
      body: refreshTokenDeleteInputSchema,
      description: "Refresh tokens can only be deleted by their owners.",
      response: apiResponse(apiSuccess(emptyObjectSchema)),
      summary: "Delete refresh token",
      tags: [Tags.authorization]
    }
  }, async function (req, res) {
    const ability = await req.auth.getAbility();
    const { refreshTokens } = req.body;
    await this.db.userToken.deleteMany({
      where: {
        OR: [
          {
            AND: [
              { id: { in: refreshTokens } },
              accessibleBy(ability, "delete").UserToken
            ]
          },
          { expiredAt: { lt: DateTime.utc().toJSDate() } }
        ]
      }
    });
    await res.status(200).send({ data: {}, success: true });
  });
}
