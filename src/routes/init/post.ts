import { httpError } from "#error";
import { apiResponse, apiSuccess, userCreateInputSchema, userPrivateDetailSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/init", {
    schema: {
      summary: "Initialization",
      description: createSwaggerDescription("Initialize Depixy"),
      tags: [Tags.system],
      body: userCreateInputSchema,
      response: apiResponse(apiSuccess(userPrivateDetailSchema))
    }
  }, async function (req, res) {
    const userCount = await this.db.user.count();
    if (userCount > 0) {
      throw httpError(StatusCodes.badRequest, "Already initialization");
    }
    const { password, ...data } = req.body;
    const passwordHash = await this.hashPassword(password);
    const user = await this.db.user.create({
      include: {
        tokens: true,
        role: { include: { permissions: true } }
      },
      data: {
        ...data,
        passwordHash,
        role: { connect: { name: "Admin" } }
      }
    });
    await res.status(StatusCodes.ok).send({ success: true, data: user });
  });
}
