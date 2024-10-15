import { assert } from "chai";
import parseSetCookie from "set-cookie-parser";
import { createApp } from "#app";
import { readConfig } from "#config";
import { loginName, password } from "./constant.js";
import type { FastifyInstance } from "fastify";

describe("Test auth routes", async () => {
  let app: FastifyInstance;
  let refreshSession = "";
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
    const cookies = parseSetCookie(res.headers["set-cookie"] ?? [], { map: true });
    refreshSession = cookies.refreshSession?.value ?? "";
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

  it("should POST /api/auth/native/access-token", async () => {
    const res = await app.inject({
      method: "POST",
      path: "/api/auth/native/access-token",
      headers: { cookie: [`refreshSession=${refreshSession}`] }
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
  });

  after(async () => {
    await app.close();
  });
});
