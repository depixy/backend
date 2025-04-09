import { Type } from "@sinclair/typebox";
import { DateTime } from "luxon";
import { HttpError } from "#plugins/error";
import { apiResponse, apiSuccess, dateTimeSchema, userLoginNameSchema, userPasswordSchema } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

const bodySchema = Type.Object({
  description: Type.String(),
  expiryDays: Type.Optional(Type.Number({ maximum: 30, minimum: 1 })),
  loginName: userLoginNameSchema,
  password: userPasswordSchema
}, {
  additionalProperties: false,
  title: "Login User Request"
});

const responseSchema = Type.Object({ expiredAt: dateTimeSchema }, {
  additionalProperties: false,
  title: "Login User Response"
});

export interface AddLoginUserRouteOptions {
  defaultExpiryDays: number;
}

export function addLoginUserRoute(app: FastifyInstance, opts: AddLoginUserRouteOptions): void {
  app.post("/login", {
    schema: {
      body: bodySchema,
      description: "Login user with given credentials. User token is returned.",
      response: apiResponse(apiSuccess(responseSchema)),
      summary: "Login user",
      tags: [Tags.authentication]
    }
  }, async function (req, res) {
    const { defaultExpiryDays } = opts;
    const { description, expiryDays = defaultExpiryDays, loginName, password } = req.body;
    const user = await this.db.user.findUnique({ where: { loginName } });
    if (!user) {
      throw HttpError.forbidden({ message: "Invalid loginName or password" });
    }
    const isPasswordValid = await this.password.verify(Buffer.from(user.passwordHash), password);
    if (!isPasswordValid) {
      throw HttpError.forbidden({ message: "Invalid loginName or password" });
    }
    await this.db.userToken.deleteMany({ where: { expiredAt: { lt: DateTime.utc().toJSDate() } } });
    const expiredAt = DateTime.utc().plus({ days: expiryDays }).toJSDate();
    const data = await this.db.userToken.create({
      data: {
        description,
        expiredAt,
        userId: user.id
      }
    });
    res.request.session.set("userToken", data.id);
    await res.status(200).send({ data, success: true });
  });
}
