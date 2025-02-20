import { AuthError } from "./auth-error.js";


export class MissingRefreshTokenError extends AuthError {
  public constructor() {
    super("Required refresh token but it is missing from request");
  }
}
