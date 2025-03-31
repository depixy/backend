import { ForbiddenError } from "@casl/ability";
import fp from "fastify-plugin";
import { HttpError } from "#plugins/error";
import { addDeclarations } from "./declarations/index.js";
import { addHooks } from "./hooks/index.js";
import { routes } from "./routes/index.js";

const name = "@joshuaavalon/fastify-plugin-auth";

export type AuthPluginOptions = {
  defaultExpiryDays: number;
};

export default fp<AuthPluginOptions>(
  async (app, opts) => {
    const { defaultExpiryDays } = opts;
    addDeclarations(app);
    addHooks(app);
    await app.register(routes, { defaultExpiryDays, prefix: "/api/auth" });
    app.addErrorFormatter(async err => {
      if (!(err instanceof ForbiddenError)) {
        return null;
      }
      return HttpError.forbidden({ cause: err });
    });
  },
  {
    dependencies: ["#plugins/database", "#plugins/error", "@fastify/cookie", "@fastify/secure-session"],
    fastify: "5.x",
    name
  }
);

declare module "@fastify/secure-session" {
  interface SessionData {
    userToken?: string;
  }
}
