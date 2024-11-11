import {
  apiListSuccess,
  apiResponse,
  tagCategoryListInputSchema,
  tagCategorySchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addSearchRoute(app: FastifyInstance): void {
  app.post("/api/tag-category/search", {
    schema: {
      body: tagCategoryListInputSchema,
      description: createSwaggerDescription(
        "Search tag categories",
        [["TagCategory", "search"]]
      ),
      response: apiResponse(apiListSuccess(tagCategorySchema, true)),
      summary: "Search tag categories",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "search");
    const { orderBy = [{ priority: "asc" }], page = 1, size = 50, where } = req.body;
    const [data, totalCount] = await Promise.all([
      this.db.tagCategory.findMany({ orderBy, skip: (page - 1) * size, take: size, where }),
      this.db.tagCategory.count({ where })
    ]);
    const totalPages = Math.ceil(totalCount / size);
    await res.status(StatusCodes.ok).send({ data, pagination: { page, size, totalPages }, success: true });
  });
}
