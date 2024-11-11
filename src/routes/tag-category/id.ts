import { apiResponse, apiSuccess, idParamSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addIdRoute(app: FastifyInstance): void {
  app.get("/api/tag-category/:id", {
    schema: {
      description: createSwaggerDescription(
        "Get tag category detail",
        [["TagCategory", "detail"]]
      ),
      params: idParamSchema,
      response: apiResponse(apiSuccess(tagCategoryDetailSchema, true)),
      summary: "Get tag category detail",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "detail");
    const { id } = req.params;
    const data = await this.db.tagCategory.findUnique({ include: { tags: true }, where: { id } });
    await res.status(StatusCodes.ok).send({ data, success: true });
  });
}
