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
      summary: "Register new user",
      description: createSwaggerDescription(
        "Create new user with `User` role.",
        [["User", "create"]]
      ),
      tags: [Tags.user],
      body: userCreateInputSchema,
      response: apiResponse(apiSuccess(userDetailSchema))
    }
  }, async function (req, res) {
    await req.assertAbility("User", "create");
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
        role: { connect: { name: "User" } }
      }
    });
    await res.status(StatusCodes.ok).send({ success: true, data: user });
  });
}
