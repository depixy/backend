import {
  apiResponse,
  apiSuccess,
  userCreateInputSchema,
  userDetailSchema
} from "#schema";
import { Tags } from "#swagger";
import { createSwaggerDescription, StatusCodes } from "#utils";
import type { FastifyInstance } from "fastify";

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/user/register", {
    schema: {
      body: userCreateInputSchema,
      description: createSwaggerDescription(
        "Create new user with `User` role.",
        [["User", "create"]]
      ),
      response: apiResponse(apiSuccess(userDetailSchema)),
      summary: "Register new user",
      tags: [Tags.user]
    }
  }, async function (req, res) {
    await req.assertAbility("User", "create");
    const { password, ...data } = req.body;
    const passwordHash = await this.hashPassword(password);
    const user = await this.db.user.create({
      data: {
        ...data,
        passwordHash,
        role: { connect: { name: "User" } }
      },
      include: {
        role: { include: { permissions: true } },
        tokens: true
      }
    });
    await res.status(StatusCodes.ok).send({ data: user, success: true });
  });
}
