import { assert } from "chai";
import { createApp } from "#app";
import { readConfig } from "#config";
import { testContext } from "./constant.js";
import type { FastifyInstance } from "fastify";

describe("Test tag category routes", async () => {
  let app: FastifyInstance;

  before(async () => {
    const cfg = await readConfig();
    app = await createApp(cfg);
  });

  it("should create tag category", async () => {
    const payload = {
      color: "#000000",
      name: "Tag Category 1",
      priority: 0
    };
    const res = await app.inject({
      headers: { cookie: testContext.cookie },
      method: "POST",
      path: "/api/tag-category",
      payload
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.color, payload.color);
    assert.equal(json.data.name, payload.name);
    assert.equal(json.data.priority, payload.priority);
    assert.deepEqual(json.data.tags, []);
    testContext.tagCategoryId = json.data.id;
  });

  it("should not create tag category with same name", async () => {
    const payload = {
      color: "#000000",
      name: "Tag Category 1",
      priority: 0
    };
    const res = await app.inject({
      headers: { cookie: testContext.cookie },
      method: "POST",
      path: "/api/tag-category",
      payload
    });
    const json = await res.json();
    assert.equal(res.statusCode, 422);
    assert.equal(json.success, false);
  });

  it("should get tag category", async () => {
    const payload = {
      color: "#000000",
      name: "Tag Category 1",
      priority: 0
    };
    const res = await app.inject({
      headers: { cookie: testContext.cookie },
      method: "GET",
      path: `/api/tag-category/${testContext.tagCategoryId}`,
      payload
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.color, payload.color);
    assert.equal(json.data.name, payload.name);
    assert.equal(json.data.priority, payload.priority);
    assert.deepEqual(json.data.tags, []);
  });

  it("should update tag category", async () => {
    const payload = { name: "Tag Category 2" };
    const res = await app.inject({
      headers: { cookie: testContext.cookie },
      method: "PATCH",
      path: `/api/tag-category/${testContext.tagCategoryId}`,
      payload
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.color, "#000000");
    assert.equal(json.data.name, payload.name);
    assert.equal(json.data.priority, 0);
    assert.deepEqual(json.data.tags, []);
  });

  it("should get tag category after update", async () => {
    const payload = {
      color: "#000000",
      name: "Tag Category 2",
      priority: 0
    };
    const res = await app.inject({
      headers: { cookie: testContext.cookie },
      method: "GET",
      path: `/api/tag-category/${testContext.tagCategoryId}`,
      payload
    });
    const json = await res.json();
    assert.equal(res.statusCode, 200);
    assert.equal(json.success, true);
    assert.equal(json.data.color, payload.color);
    assert.equal(json.data.name, payload.name);
    assert.equal(json.data.priority, payload.priority);
    assert.deepEqual(json.data.tags, []);
  });

  after(async () => {
    await app.close();
  });
});
