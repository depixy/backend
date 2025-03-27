import { assert } from "chai";
import { Argon2PasswordStrategy } from "../password.js";

it("should hash and verify correct password", async () => {
  const password = "password";
  const handler = new Argon2PasswordStrategy();
  const hash = await handler.hash(password);
  assert.isTrue(await handler.verify(hash, password));
});

it("should hash and verify incorrect password", async () => {
  const password = "password";
  const handler = new Argon2PasswordStrategy();
  const hash = await handler.hash(password);
  assert.isFalse(await handler.verify(hash, `${password}1`));
});
