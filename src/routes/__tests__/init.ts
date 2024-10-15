import { assert } from "chai";
import { createApp } from "#app";
import { readConfig } from "#config";
import { loginName, password } from "./constant.js";
import type { FastifyInstance } from "fastify";

describe("Test init routes", async () => {
  let app: FastifyInstance;
  before(async () => {
    const cfg = await readConfig();
    app = await createApp(cfg);
  });

  it("should POST /api/init", async () => {
    const payload = {
      loginName,
      displayName: "test",
      password,
      email: "test@example.com"
    };
    const res = await app.inject({ method: "POST", path: "/api/init", payload });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.loginName, loginName);
    assert.isUndefined(json.password);
  });

  it("should not POST /api/init after initialization", async () => {
    const payload = {
      loginName,
      displayName: "test",
      password,
      email: "test@example.com"
    };
    const res = await app.inject({ method: "POST", path: "/api/init", payload });
    const json = await res.json();
    assert.equal(res.statusCode, 400);
    assert.equal(json.success, false);
  });

  after(async () => {
    await app.close();
  });
});
