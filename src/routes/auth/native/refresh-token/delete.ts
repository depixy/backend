import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import {
  apiResponse,
  apiSuccess,
  uuidSchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const bodySchema = Type.Object({ userTokenIds: Type.Array(uuidSchema()) }, { additionalProperties: false });

const responseSchema = apiSuccess(Type.Object({}, { additionalProperties: false }));

export function addDeleteRoute(app: FastifyInstance): void {
  app.delete("/api/auth/native/refresh-token", {
    schema: {
      summary: "Delete refresh token",
      description: createSwaggerDescription(
        "Refresh tokens can only be deleted by their owners.",
        [["UserToken", "delete:self"]]
      ),
      tags: [Tags.authorization],
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    const user = await req.getUserOrThrow();
    await req.assertAbility("UserToken", "delete:self");
    const { userTokenIds } = req.body;
    if (userTokenIds.length > 0) {
      await this.db.userToken.deleteMany({
        where: {
          OR: [
            { id: { in: userTokenIds }, userId: user.id },
            { expiredAt: { lt: DateTime.now().toJSDate() } }
          ]
        }
      });
    }
    await res.status(StatusCodes.ok).send({ success: true, data: {} });
  });
}
