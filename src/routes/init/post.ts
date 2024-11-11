import { httpError } from "#error";
import { apiResponse, apiSuccess, userCreateInputSchema, userPrivateDetailSchema } from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/init", {
    schema: {
      body: userCreateInputSchema,
      description: createSwaggerDescription("Initialize Depixy"),
      response: apiResponse(apiSuccess(userPrivateDetailSchema)),
      summary: "Initialization",
      tags: [Tags.system]
    }
  }, async function (req, res) {
    const userCount = await this.db.user.count();
    if (userCount > 0) {
      throw httpError(StatusCodes.badRequest, "Already initialization");
    }
    const { password, ...data } = req.body;
    const passwordHash = await this.hashPassword(password);
    const user = await this.db.user.create({
      data: {
        ...data,
        passwordHash,
        role: { connect: { name: "Admin" } }
      },
      include: {
        role: { include: { permissions: true } },
        tokens: true
      }
    });
    await res.status(StatusCodes.ok).send({ data: user, success: true });
  });
}
