import { apiResponse, apiSuccess, tagCategoryCreateInputSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addCreateTagCategoryRoute(app: FastifyInstance): void {
  app.post("/api/tag-category", {
    ability: { can: [["create", "TagCategory"]] },
    schema: {
      body: tagCategoryCreateInputSchema,
      description: "Create new tag category",
      response: apiResponse(apiSuccess(tagCategoryDetailSchema)),
      summary: "Create tag category",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    const data = await this.db.tagCategory.create({ data: req.body, include: { tags: true } });
    await res.status(200).send({ data, success: true });
  });
}
