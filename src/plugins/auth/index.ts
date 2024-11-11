import fp from "fastify-plugin";
import { addFunctions } from "./func/index.js";

const name = "#plugins/auth";


export const authPlugin = fp(
  async app => {
    addFunctions(app);
  },
  {
    decorators: { fastify: ["db"] },
    dependencies: [],
    fastify: "5.x",
    name
  }
);


declare module "@fastify/secure-session" {
  interface SessionData {
    userTokenId?: string;
  }
}
