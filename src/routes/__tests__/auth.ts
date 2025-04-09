import { assert } from "chai";
import { createApp } from "#app";
import { readConfig } from "#config";
import { loginName, password, testContext } from "./constant.js";
import type { FastifyInstance } from "fastify";

describe("Test auth routes", async () => {
  let app: FastifyInstance;

  before(async () => {
    const cfg = await readConfig();
    app = await createApp(cfg);
  });

  it("should POST /api/auth/login", async () => {
    const payload = {
      description: "",
      loginName,
      password
    };
    const res = await app.inject({ method: "POST", path: "/api/auth/login", payload });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    testContext.cookie = (Array.isArray(res.headers["set-cookie"]) ? res.headers["set-cookie"][0] : res.headers["set-cookie"]) ?? "";
  });

  it("should not POST /api/auth/login", async () => {
    const payload = {
      description: "",
      loginName,
      password: `${password}!`
    };
    const res = await app.inject({ method: "POST", path: "/api/auth/login", payload });
    const json = await res.json();
    assert.equal(res.statusCode, 403);
    assert.equal(json.success, false);
  });

  it("should POST /api/auth/logout", async () => {
    const payload = {
      description: "",
      loginName,
      password
    };
    const res1 = await app.inject({ method: "POST", path: "/api/auth/login", payload });
    const json1 = await res1.json();
    assert.equal(res1.statusCode, 200);
    assert.equal(json1.success, true);
    const cookie = (Array.isArray(res1.headers["set-cookie"]) ? res1.headers["set-cookie"][0] : res1.headers["set-cookie"]) ?? "";

    const res = await app.inject({
      headers: { cookie },
      method: "POST",
      path: "/api/auth/logout",
      payload: {}
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
  });

  after(async () => {
    await app.close();
  });
});
