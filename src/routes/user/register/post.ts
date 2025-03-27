import {
  apiResponse,
  apiSuccess,
  userCreateInputSchema,
  userPrivateDetailSchema
} from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/user/register", {
    ability: { can: [["create", "User"]] },
    schema: {
      body: userCreateInputSchema,
      description: "Create new user with `User` role.",
      response: apiResponse(apiSuccess(userPrivateDetailSchema)),
      summary: "Register new user",
      tags: [Tags.user]
    }
  }, async function (req, res) {
    const { password, ...data } = req.body;
    const passwordHash = await this.password.hash(password);
    const user = await this.db.user.create({
      data: {
        ...data,
        passwordHash,
        role: "user"
      },
      include: { tokens: true }
    });
    await res.status(200).send({ data: user, success: true });
  });
}
