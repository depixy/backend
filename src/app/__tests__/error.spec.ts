import { assert } from "chai";
import { readConfig } from "#config";
import { createApp } from "../index.js";

import type { FastifyInstance } from "fastify";

describe("Test errors", async () => {
  let app: FastifyInstance;
  before(async () => {
    const cfg = await readConfig();
    app = await createApp(cfg);
    app.get("/internal-error", {}, async () => {
      throw new Error("Unknown error");
    });
  });

  it("should return 404 NOT_FOUND json", async () => {
    const res = await app.inject({ method: "GET", path: "/not-exists" });
    const json = await res.json();
    assert.equal(res.statusCode, 404);
    assert.equal(json.success, false);
    assert.equal(json.code, "NOT_FOUND");
  });

  it("should return 500 INTERNAL_SERVER_ERROR json", async () => {
    const res = await app.inject({ method: "GET", path: "/internal-error" });
    const json = await res.json();
    assert.equal(res.statusCode, 500);
    assert.equal(json.success, false);
    assert.equal(json.code, "INTERNAL_SERVER_ERROR");
  });

  after(async () => {
    await app.close();
  });
});
