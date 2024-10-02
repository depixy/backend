import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import { httpError } from "#error";
import {
  apiSuccess,
  apiResponse,
  loginNameSchema,
  passwordSchema,
  accessTokenSchema
} from "#schema";
import { StatusCodes } from "#utils";

import type { FastifyInstance } from "fastify";

const paramsSchema = Type.Object({ }, { additionalProperties: false });

const bodySchema = Type.Object({
  loginName: loginNameSchema,
  password: passwordSchema,
  description: Type.Optional(Type.String({ maxLength: 50 }))
}, { additionalProperties: false });

const responseSchema = apiSuccess(accessTokenSchema);

export function addPostRoute(app: FastifyInstance): void {
  app.post("/api/auth/native/access-token", {
    schema: {
      summary: "Create access token",
      description: "Create access token with given credentials.",
      tags: ["Authorization"],
      params: paramsSchema,
      body: bodySchema,
      response: apiResponse(responseSchema)
    }
  }, async function (req, res) {
    const { loginName, password, description = "" } = req.body;
    const user = await this.db.user.findUnique({ where: { loginName } });
    if (!user) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    const isPasswordValid = await this.verifyPassword(user.passwordHash, password);
    if (!isPasswordValid) {
      throw httpError(StatusCodes.forbidden, "Invalid loginName or password");
    }
    const data = await this.db.userToken.create({
      select: { id: true, expiredAt: true },
      data: {
        userId: user.id,
        description,
        expiredAt: DateTime.now().plus({ seconds: this.config.session.expiry }).toJSDate()
      }
    });
    if (!data) {
      throw httpError(StatusCodes.notFound);
    }
    req.accessSession.set("id", data.id);
    res.status(200).send({ success: true, data });
  });
}
