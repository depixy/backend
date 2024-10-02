import { assert } from "chai";
import { readConfig } from "../index.js";

describe("Test config", async () => {
  it("should read default value from config", async () => {
    const cfg = await readConfig();
    assert.equal(cfg.logging.request, "forbidden");
    assert.equal(cfg.logging.database, "warn");
    assert.equal(cfg.network.trustProxy, false);
  });
});
