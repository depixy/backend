import { accessibleBy } from "@casl/prisma";
import {
  apiListSuccess,
  apiResponse,
  tagCategoryListInputSchema,
  tagCategorySchema
} from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addSearchRoute(app: FastifyInstance): void {
  app.post("/api/tag-category/search", {
    ability: { can: [["read", "TagCategory"]] },
    schema: {
      body: tagCategoryListInputSchema,
      description: "Search tag categories",
      response: apiResponse(apiListSuccess(tagCategorySchema, true)),
      summary: "Search tag categories",
      tags: [Tags.tagCategory]
    }
  }, async function (req, res) {
    const ability = await req.getAbility();
    const { orderBy = [{ priority: "asc" }], page = 1, size = 50, where = {} } = req.body;
    const [data, totalCount] = await Promise.all([
      this.db.tagCategory.findMany({
        orderBy,
        skip: (page - 1) * size,
        take: size,
        where: { AND: [where, accessibleBy(ability, "read").TagCategory] }
      }),
      this.db.tagCategory.count({ where: { AND: [where, accessibleBy(ability, "read").TagCategory] } })
    ]);
    const totalPages = Math.ceil(totalCount / size);
    await res.status(200).send({ data, pagination: { page, size, totalPages }, success: true });
  });
}
