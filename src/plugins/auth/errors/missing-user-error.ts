import { AuthError } from "./auth-error.js";

export class MissingUserError extends AuthError {
  public constructor() {
    super("Required user but it is missing from request");
  }
}
