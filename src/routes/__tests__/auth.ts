import { assert } from "chai";
import { createApp } from "#app";
import { readConfig } from "#config";
import { loginName, password } from "./constant.js";
import type { FastifyInstance } from "fastify";

describe("Test routes", async () => {
  describe("Test auth", async () => {
    let app: FastifyInstance;
    before(async () => {
      const cfg = await readConfig();
      app = await createApp(cfg);
    });

    it("should POST /api/auth/native/refresh-token", async () => {
      const payload = {
        loginName,
        password,
        description: ""
      };
      const res = await app.inject({ method: "POST", path: "/api/auth/native/refresh-token", payload });
      const json = await res.json();
      assert.equal(res.statusCode, 200);
      assert.equal(json.success, true);
    });

    it("should not POST /api/auth/native/refresh-token", async () => {
      const payload = {
        loginName,
        password: `${password}!`,
        description: ""
      };
      const res = await app.inject({ method: "POST", path: "/api/auth/native/refresh-token", payload });
      const json = await res.json();
      assert.equal(res.statusCode, 403);
      assert.equal(json.success, false);
    });

    after(async () => {
      await app.close();
    });
  });
});
