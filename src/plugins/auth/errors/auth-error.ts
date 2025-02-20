import { ApiError } from "#plugins/error";

export class AuthError extends ApiError {
  public constructor(message = "Unauthorized") {
    super({ code: "UNAUTHORIZED", message, status: 400 });
  }
}
