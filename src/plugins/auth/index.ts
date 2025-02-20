import { ForbiddenError } from "@casl/ability";
import fp from "fastify-plugin";
import { HttpError } from "#plugins/error";
import { addAuthContext } from "./auth-context/index.js";
import { initPasswordHandler } from "./password-handler/index.js";
import type { RefreshSessionData, Session } from "@fastify/secure-session";
import type { FastifyInstance } from "fastify";
import type { DateTime } from "luxon";
import type { Bindings } from "pino";
import type { AuthContext, AuthContextOptions, AuthUser } from "./auth-context/index.js";
import type { PasswordAlgorithm, PasswordHandler } from "./password-handler/index.js";

export type { AuthContextConfig } from "./auth-context/index.js";
export * from "./auth-context/index.js";

const name = "@joshuaavalon/fastify-plugin-auth";

export type RefreshTokenOptions = {

  /**
   * Generate a refresh token.
   * It should be persisted in database.
   */
  generate: (app: FastifyInstance, user: AuthUser, expiredAt: DateTime<true> | null) => Promise<string>;
};

export type AuthPluginOptions = {
  authContext: AuthContextOptions;

  /**
   * Log bindings for all logs emitted by this plugin.
   * Use boolean to enable or disable log bindings.
   * @defaultValue { plugin: {@link name} }
   */
  logBindings?: Bindings | false;
  passwordAlgorithm?: PasswordAlgorithm;
};

export default fp<AuthPluginOptions>(
  async (app, opts) => {
    const { authContext, logBindings = { plugin: name }, passwordAlgorithm = "Argon2" } = opts;
    const logger = logBindings ? app.log.child(logBindings) : app.log;
    addAuthContext(app, { authContext, logger });
    await initPasswordHandler(app, passwordAlgorithm);
    app.addErrorFormatter(async err => {
      if (!(err instanceof ForbiddenError)) {
        return null;
      }
      return HttpError.forbidden({ cause: err });
    });
  },
  {
    dependencies: ["#plugins/error", "@fastify/cookie", "@fastify/secure-session"],
    fastify: "5.x",
    name
  }
);

declare module "fastify" {
  interface FastifyRequest {
    readonly auth: AuthContext;
    refreshSession: Session<RefreshSessionData>;
  }

  interface FastifyInstance {
    password: PasswordHandler;
  }
}

declare module "@fastify/secure-session" {
  interface SessionData {
    userToken?: string;
  }

  interface RefreshSessionData {
    userToken?: string;
  }
}
