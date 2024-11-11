import { apiResponse, apiSuccess, tagCategoryCreateInputSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/tag-category", {
    schema: {
      body: tagCategoryCreateInputSchema,
      description: createSwaggerDescription(
        "Create new tag category",
        [["TagCategory", "create"]]
      ),
      response: apiResponse(apiSuccess(tagCategoryDetailSchema)),
      summary: "Create tag category",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "create");
    const data = await this.db.tagCategory.create({ data: req.body, include: { tags: true } });
    await res.status(StatusCodes.ok).send({ data, success: true });
  });
}
