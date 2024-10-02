import { Type } from "@sinclair/typebox";
import sodium from "sodium-native";

export const session = Type.Object({
  secret: Type.String({ minLength: 32 }),
  salt: Type.String({ minLength: sodium.crypto_pwhash_SALTBYTES, maxLength: sodium.crypto_pwhash_SALTBYTES }),
  expiry: Type.Number({ minimum: 600, description: "Number of second for the session to be expired" })
}, {
  title: "Session Configuration",
  description: "All session related Configuration",
  additionalProperties: false
});
