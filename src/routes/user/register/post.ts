import { Type } from "@sinclair/typebox";
import { httpError } from "#error";
import {
  apiSuccess,
  apiResponse,
  displayNameSchema,
  loginNameSchema,
  passwordSchema,
  userDetailSchema,
  emailSchema
} from "#schema";
import { StatusCodes } from "#utils";

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
      description: "This feature must be enabled in configuration (`feature.userRegistration`).",
      tags: ["User"],
      params: paramsSchema,
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    if (!this.config.feature.userRegistration) {
      throw httpError(StatusCodes.forbidden, "User registration is disabled.");
    }
    const { password, ...data } = req.body;
    const passwordHash = await this.hashPassword(password);
    const user = await this.db.user.create({
      include: { tokens: true },
      data: { passwordHash, ...data }
    });
    res.status(StatusCodes.ok).send({ success: true, data: user });
  });
}
