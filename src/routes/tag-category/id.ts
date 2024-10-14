import { Type } from "@sinclair/typebox";
import { apiResponse, apiSuccess, tagCategoryDetailSchema, uuidSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

const paramsSchema = Type.Object({ id: uuidSchema() }, { additionalProperties: false });

const responseSchema = apiSuccess(tagCategoryDetailSchema, true);

export function addIdRoute(app: FastifyInstance): void {
  app.get("/api/tag-category/:id", {
    schema: {
      summary: "Get tag category detail",
      description: createSwaggerDescription(
        "Get tag category detail",
        [["TagCategory", "detail"]]
      ),
      tags: [Tags.tagCategory],
      params: paramsSchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    await req.assertAbility("TagCategory", "detail");
    const { id } = req.params;
    const data = await this.db.tagCategory.findUnique({ include: { tags: true }, where: { id } });
    await res.status(StatusCodes.ok).send({ success: true, data });
  });
}
