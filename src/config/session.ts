import { Type } from "@sinclair/typebox";
import sodium from "sodium-native";

export const session = Type.Object({
  expiry: Type.Number({ description: "Number of second for the session to be expired", minimum: 600 }),
  salt: Type.String({ maxLength: sodium.crypto_pwhash_SALTBYTES, minLength: sodium.crypto_pwhash_SALTBYTES }),
  secret: Type.String({ minLength: 32 })
}, {
  additionalProperties: false,
  description: "All session related configuration",
  title: "Session Configuration"
});
