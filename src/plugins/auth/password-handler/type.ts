export interface PasswordHandler {
  hash(password: string): Promise<Buffer>;
  verify(hash: Buffer, password: string): Promise<boolean>;
}
