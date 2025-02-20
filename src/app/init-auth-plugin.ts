import cookiePlugin from "@fastify/cookie";
import sessionPlugin from "@fastify/secure-session";
import { DateTime, Duration } from "luxon";
import { defineAbilityFor } from "#ability";
import authPlugin from "#plugins/auth";
import type { FastifyInstance } from "fastify";
import type { Config } from "#config";
import type { AuthContextOptions } from "#plugins/auth";

const findUser: AuthContextOptions["findUser"] = async (app, userToken) => {
  const token = await app.db.userToken.findUnique({
    include: { user: true },
    where: { AND: [{ expiredAt: { gte: DateTime.utc().toJSDate() } }], id: userToken }
  });
  return token?.user ?? null;
};

const createUserToken: AuthContextOptions["createUserToken"] = async (app, user, opts) => {
  const { description } = opts;
  const expiredAt = DateTime.utc().plus({ days: app.config.session.expiry }).toJSDate();
  const token = await app.db.userToken.create({
    data: {
      description,
      expiredAt,
      userId: user.id
    }
  });
  return token;
};

export async function initAuthPlugin(app: FastifyInstance, cfg: Config): Promise<void> {
  await app.register(cookiePlugin);
  Duration.fromObject({ days: cfg.session.expiry });
  const refreshSessionExpiry = Duration.fromObject({ days: cfg.session.expiry });
  const refreshSessionExpiryTime = refreshSessionExpiry.as("seconds");
  const sessionExpiry = Duration.fromObject({ minutes: 5 });
  const sessionExpiryTime = sessionExpiry.as("seconds");
  await app.register(sessionPlugin, [{
    cookie: {
      httpOnly: true,
      maxAge: refreshSessionExpiryTime,
      path: "/",
      sameSite: "strict",
      secure: "auto"
    },
    expiry: refreshSessionExpiryTime,
    salt: cfg.session.salt,
    secret: cfg.session.secret,
    sessionName: "refreshSession"
  }, {
    cookie: {
      httpOnly: true,
      maxAge: sessionExpiryTime,
      path: "/",
      sameSite: "strict",
      secure: "auto"
    },
    expiry: sessionExpiryTime,
    salt: cfg.session.salt,
    secret: cfg.session.secret,
    sessionName: "session"
  }]);
  await app.register(authPlugin, {
    authContext: {
      async createAbility(_app, user) {
        return defineAbilityFor(user);
      },
      createUserToken,
      findUser
    }
  });
}
