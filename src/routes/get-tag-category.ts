import { accessibleBy } from "@casl/prisma";
import { apiResponse, apiSuccess, idParamSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addGetTagCategoryRoute(app: FastifyInstance): void {
  app.get("/api/tag-category/:id", {
    ability: { can: [["read", "TagCategory"]] },
    schema: {
      description: "Get tag category",
      params: idParamSchema,
      response: apiResponse(apiSuccess(tagCategoryDetailSchema, true)),
      summary: "Get tag category",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    const ability = await req.getAbility();
    const { id } = req.params;
    const data = await this.db.tagCategory.findUnique({
      include: { tags: true },
      where: {
        AND: [accessibleBy(ability, "read").TagCategory],
        id
      }
    });
    await res.status(200).send({ data, success: true });
  });
}
