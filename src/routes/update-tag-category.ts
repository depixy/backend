import { accessibleBy } from "@casl/prisma";
import { Type } from "@sinclair/typebox";
import { apiResponse, apiSuccess, idParamSchema, tagCategoryCreateInputSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addUpdateTagCategoryRoute(app: FastifyInstance): void {
  app.patch("/api/tag-category/:id", {
    ability: { can: [["edit", "TagCategory"]] },
    schema: {
      body: Type.Partial(tagCategoryCreateInputSchema),
      description: "Update tag category",
      params: idParamSchema,
      response: apiResponse(apiSuccess(tagCategoryDetailSchema)),
      summary: "Update tag category",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    const ability = await req.getAbility();
    const { id } = req.params;
    const data = await this.db.tagCategory.update({
      data: req.body,
      include: { tags: true },
      where: {
        AND: [accessibleBy(ability, "edit").TagCategory],
        id
      }
    });
    await res.status(200).send({ data, success: true });
  });
}
