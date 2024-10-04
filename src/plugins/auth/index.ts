import fp from "fastify-plugin";
import { addFunctions } from "./func/index.js";

const name = "#plugins/auth";


export const authPlugin = fp(
  async app => {
    addFunctions(app);
  },
  {
    name,
    fastify: "5.x",
    dependencies: [],
    decorators: { fastify: ["db"] }
  }
);


declare module "@fastify/secure-session" {
  interface SessionData {
    userTokenId?: string;
  }
}
