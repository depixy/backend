import {
  apiListSuccess,
  apiResponse,
  tagCategoryListInputSchema,
  tagCategorySchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addGetRoute(app: FastifyInstance): void {
  app.get("/api/tag-category", {
    schema: {
      description: createSwaggerDescription(
        "List tag categories",
        [["TagCategory", "search"]]
      ),
      querystring: tagCategoryListInputSchema,
      response: apiResponse(apiListSuccess(tagCategorySchema, true)),
      summary: "List tag categories",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "search");
    const { orderBy = [{ priority: "asc" }], page = 1, size = 50, where } = req.query;
    const [data, totalCount] = await Promise.all([
      this.db.tagCategory.findMany({ orderBy, skip: (page - 1) * size, take: size, where }),
      this.db.tagCategory.count({ where })
    ]);
    const totalPages = Math.ceil(totalCount / size);
    await res.status(StatusCodes.ok).send({ data, pagination: { page, size, totalPages }, success: true });
  });
}
