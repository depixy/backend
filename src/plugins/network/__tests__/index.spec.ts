import { assert } from "chai";
import fastify from "fastify";
import plugin from "../index.js";
import type { FastifyInstance } from "fastify";

describe("Test #plugins/network", () => {
  let app: FastifyInstance;

  before(async () => {
    app = await fastify({ trustProxy: true });
    await app.register(plugin, { ipHeader: "custom-header", trustProxy: true });
    app.get(
      "/",
      async (req, res) => {
        res.send({ ip: req.ip, ips: req.ips });
      }
    );
  });

  it("should return custom ip header", async () => {
    const res = await app.inject({
      headers: { "custom-header": "1.1.1.1" },
      method: "get",
      path: "/"
    });
    const { ip } = res.json();
    assert.equal(ip, "1.1.1.1");
  });

  it("should return custom ip header ignore case", async () => {
    const res = await app.inject({
      headers: { "CustoM-header": "1.1.1.1" },
      method: "get",
      path: "/"
    });
    const { ip } = res.json();
    assert.equal(ip, "1.1.1.1");
  });
});
