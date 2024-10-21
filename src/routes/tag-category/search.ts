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
      summary: "Search tag categories",
      description: createSwaggerDescription(
        "Search tag categories",
        [["TagCategory", "search"]]
      ),
      tags: [Tags.tagCategory],
      body: tagCategoryListInputSchema,
      response: apiResponse(apiListSuccess(tagCategorySchema, true))
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "search");
    const { page = 1, size = 50, orderBy = [{ priority: "asc" }], where } = req.body;
    const [data, totalCount] = await Promise.all([
      this.db.tagCategory.findMany({ take: size, skip: (page - 1) * size, orderBy, where }),
      this.db.tagCategory.count({ where })
    ]);
    const totalPages = Math.ceil(totalCount / size);
    await res.status(StatusCodes.ok).send({ success: true, data, pagination: { totalPages, page, size } });
  });
}
