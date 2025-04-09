import { accessibleBy } from "@casl/prisma";
import { apiResponse, apiSuccess, idParamSchema, userSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addGetUserRoute(app: FastifyInstance): void {
  app.post("/api/user/:id", {
    ability: { can: [["read", "User"]] },
    schema: {
      description: "Get user",
      params: idParamSchema,
      response: apiResponse(apiSuccess(userSchema, true)),
      summary: "Get user",
      tags: [Tags.user]
    }
  }, async function (req, res) {
    const ability = await req.getAbility();
    const { id } = req.params;
    const data = await this.db.user.findUnique({
      where: {
        AND: [accessibleBy(ability, "read").User],
        id
      }
    });
    await res.status(200).send({ data, success: true });
  });
}
