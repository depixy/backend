import { apiResponse, apiSuccess, tagCategoryCreateInputSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/tag-category", {
    schema: {
      body: tagCategoryCreateInputSchema,
      description: "Create new tag category",
      response: apiResponse(apiSuccess(tagCategoryDetailSchema)),
      summary: "Create tag category",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    await req.auth.can("create", "TagCategory");
    const data = await this.db.tagCategory.create({ data: req.body, include: { tags: true } });
    await res.status(200).send({ data, success: true });
  });
}
