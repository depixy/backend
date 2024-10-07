import { Type } from "@sinclair/typebox";
import {
  apiSuccess,
  apiResponse,
  displayNameSchema,
  loginNameSchema,
  passwordSchema,
  userDetailSchema,
  emailSchema
} from "#schema";
import { StatusCodes, createSwaggerDescription } from "#utils";

import type { FastifyInstance } from "fastify";

const paramsSchema = Type.Object({ }, { additionalProperties: false });

const bodySchema = Type.Object({
  loginName: loginNameSchema,
  displayName: displayNameSchema,
  email: emailSchema,
  password: passwordSchema
}, { additionalProperties: false });

const responseSchema = apiSuccess(userDetailSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/user/register", {
    schema: {
      summary: "Register new user",
      description: createSwaggerDescription(
        "Create new user with `User` role.",
        [["User", "create"]]
      ),
      tags: ["User"],
      params: paramsSchema,
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    await req.assertAbility("User", "create");
    const { password, ...data } = req.body;
    const passwordHash = await this.hashPassword(password);
    const user = await this.db.user.create({
      include: { tokens: true },
      data: {
        ...data,
        passwordHash,
        role: { connect: { name: "User" } }
      }
    });
    res.status(StatusCodes.ok).send({ success: true, data: user });
  });
}
