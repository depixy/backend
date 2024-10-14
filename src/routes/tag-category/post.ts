import { apiResponse, apiSuccess, tagCategoryCreateInputSchema, tagCategoryDetailSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const bodySchema = tagCategoryCreateInputSchema;

const responseSchema = apiSuccess(tagCategoryDetailSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/tag-category", {
    schema: {
      summary: "Create tag category",
      description: createSwaggerDescription(
        "Create new tag category",
        [["TagCategory", "create"]]
      ),
      tags: [Tags.tagCategory],
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "create");
    const data = await this.db.tagCategory.create({ include: { tags: true }, data: req.body });
    await res.status(StatusCodes.ok).send({ success: true, data });
  });
}
