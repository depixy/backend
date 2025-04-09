import { HttpError } from "#plugins/error";
import { apiResponse, apiSuccess, userCreateInputSchema, userPrivateDetailSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addInitializationRoute(app: FastifyInstance): void {
  app.post("/api/init", {
    schema: {
      body: userCreateInputSchema,
      description: "Initialize Depixy",
      response: apiResponse(apiSuccess(userPrivateDetailSchema)),
      summary: "Initialization",
      tags: [Tags.system]
    }
  }, async function (req, res) {
    const userCount = await this.db.user.count();
    if (userCount > 0) {
      throw HttpError.badRequest({ message: "Already initialization" });
    }
    const { password, ...data } = req.body;
    const passwordHash = await this.password.hash(password);
    const user = await this.db.user.create({
      data: {
        ...data,
        passwordHash,
        role: "admin"
      },
      include: { tokens: true }
    });
    await res.status(200).send({ data: user, success: true });
  });
}
