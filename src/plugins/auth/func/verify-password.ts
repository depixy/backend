import sodium from "sodium-native";

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return sodium.crypto_pwhash_str_verify(Buffer.from(hash), Buffer.from(password));
}
