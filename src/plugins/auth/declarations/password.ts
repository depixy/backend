import sodium from "sodium-native";
import type { FastifyInstance } from "fastify";

interface PasswordStrategy {
  hash(password: string): Promise<Buffer>;
  verify(hash: Buffer, password: string): Promise<boolean>;
}

export class Argon2PasswordStrategy implements PasswordStrategy {
  public async hash(password: string): Promise<Buffer> {
    const outputBuffer = Buffer.alloc(sodium.crypto_pwhash_STRBYTES);
    sodium.crypto_pwhash_str(
      outputBuffer,
      Buffer.from(password),
      sodium.crypto_pwhash_OPSLIMIT_MODERATE,
      sodium.crypto_pwhash_MEMLIMIT_MODERATE
    );
    return outputBuffer;
  }


  public async verify(hash: Buffer, password: string): Promise<boolean> {
    return sodium.crypto_pwhash_str_verify(hash, Buffer.from(password));
  }
}

export function decoratePassword(app: FastifyInstance): void {
  app.decorate("password", new Argon2PasswordStrategy());
}

declare module "fastify" {
  interface FastifyInstance {
    password: PasswordStrategy;
  }
}
