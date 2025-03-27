import cookiePlugin from "@fastify/cookie";
import sessionPlugin from "@fastify/secure-session";
import { Duration } from "luxon";
import authPlugin from "#plugins/auth";
import type { FastifyInstance } from "fastify";
import type { Config } from "#config";

export async function initAuthPlugin(app: FastifyInstance, cfg: Config): Promise<void> {
  await app.register(cookiePlugin);
  Duration.fromObject({ days: cfg.session.expiry });
  const sessionExpiry = Duration.fromObject({ days: 30 });
  const sessionExpiryTime = sessionExpiry.as("seconds");
  await app.register(sessionPlugin, [{
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
  await app.register(authPlugin, { defaultExpiryDays: cfg.session.expiry });
}
