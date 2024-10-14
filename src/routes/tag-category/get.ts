import { Type } from "@sinclair/typebox";
import {
  apiListSuccess,
  apiResponse,
  pageInputSchema,
  sizeInputSchema,
  tagCategoryOrderBySchema,
  tagCategorySchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const querySchema = Type.Object({
  page: Type.Optional(pageInputSchema),
  size: Type.Optional(sizeInputSchema),
  orderBy: Type.Optional(Type.Array(tagCategoryOrderBySchema))
});

const responseSchema = apiListSuccess(tagCategorySchema, true);

export function addGetRoute(app: FastifyInstance): void {
  app.get("/api/tag-category", {
    schema: {
      summary: "List tag categories",
      description: createSwaggerDescription(
        "List tag categories",
        [["TagCategory", "detail"]]
      ),
      tags: [Tags.tagCategory],
      querystring: querySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "detail");
    const { page = 1, size = 50, orderBy = [{ updatedAt: "desc" }] } = req.query;
    const [data, totalCount] = await Promise.all([
      this.db.tagCategory.findMany({ take: size, skip: (page - 1) * size, orderBy }),
      this.db.tagCategory.count()
    ]);
    const totalPages = Math.ceil(totalCount / size);
    await res.status(StatusCodes.ok).send({ success: true, data, pagination: { totalPages, page, size } });
  });
}
