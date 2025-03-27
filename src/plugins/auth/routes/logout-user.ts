import { Type } from "@sinclair/typebox";
import { apiResponse, apiSuccess } from "#schema";
import { Tags } from "#swagger";
import type { FastifyInstance } from "fastify";

const bodySchema = Type.Object({ userTokens: Type.Optional(Type.Array(Type.String(), { minItems: 1 })) }, {
  additionalProperties: false,
  title: "Logout User Request"
});

const responseSchema = Type.Object({}, {
  additionalProperties: false,
  title: "Logout User Response"
});

export function addLogoutUserRoute(app: FastifyInstance): void {
  app.post("/logout", {
    schema: {
      body: bodySchema,
      description: "Logout user by removing user tokens. If no user tokens are given, current user token removed.",
      response: apiResponse(apiSuccess(responseSchema)),
      summary: "Logout user",
      tags: [Tags.authentication]
    }
  }, async function (req, res) {
    const { userToken } = req.session;
    const user = await req.getUser();
    if (!userToken || !user) {
      await res.status(200).send({ data: {}, success: true });
      return;
    }
    const { userTokens = [userToken] } = req.body;
    await this.db.userToken.deleteMany({
      where: {
        AND: [
          { id: { in: userTokens } },
          { userId: user.id }
        ]
      }
    });
    await res.status(200).send({ data: {}, success: true });
  });
}
