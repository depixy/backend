import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import {
  apiSuccess,
  apiResponse,
  uuidSchema
} from "#schema";
import { StatusCodes } from "#utils";

import type { FastifyInstance } from "fastify";

const paramsSchema = Type.Object({ }, { additionalProperties: false });

const bodySchema = Type.Object({ userTokenIds: Type.Array(uuidSchema()) }, { additionalProperties: false });

const responseSchema = apiSuccess(Type.Object({}, { additionalProperties: false }));

export function addDeleteRoute(app: FastifyInstance): void {
  app.delete("/api/auth/native/refresh-token", {
    schema: {
      summary: "Delete refresh token",
      description: "Refresh tokens can only be deleted by their owners.",
      tags: ["Authorization"],
      params: paramsSchema,
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    const user = await req.getUserOrThrow();
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
    res.status(StatusCodes.ok).send({ success: true, data: {} });
  });
}
