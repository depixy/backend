import { HttpError } from "#plugins/error";
import { MissingRefreshTokenError, MissingUserError } from "../errors/index.js";
import type { User, UserToken } from "@prisma/client";
import type { FastifyInstance, FastifyRequest } from "fastify";
import type { AppAbility } from "#ability";

export interface AuthContextConfig {
  ability: AppAbility;
}

export interface AuthUser extends User {
}

export interface AuthUserToken extends UserToken {
}

export interface CreateUserTokenOptions {
  description: string;
}

export type AuthContextOptions = {
  createAbility: (app: FastifyInstance, user: AuthUser | null) => Promise<AuthContextConfig["ability"]>;
  createUserToken: (app: FastifyInstance, user: AuthUser, opts: CreateUserTokenOptions) => Promise<AuthUserToken>;
  findUser: (app: FastifyInstance, userToken: string) => Promise<AuthUser | null>;
};

export class AuthContext {
  private readonly req: FastifyRequest;
  private readonly app: FastifyInstance;
  private readonly opts: AuthContextOptions;
  private user?: AuthUser | null;

  public constructor(req: FastifyRequest, opts: AuthContextOptions) {
    this.req = req;
    this.app = req.server;
    this.opts = opts;
  }

  public async getUser(): Promise<AuthUser | null> {
    if (this.user || this.user === null) {
      return this.user;
    }
    const userToken = this.req.session.userToken;
    if (!userToken) {
      return null;
    }
    const user = await this.opts.findUser(this.app, userToken);
    this.user = user;
    return user;
  }

  public async getUserOrThrow(): Promise<AuthUser> {
    const user = await this.getUser();
    if (!user) {
      throw HttpError.unauthorized();
    }
    return user;
  }

  public setUser(user: AuthUser): void {
    this.user = user;
  }

  public async authenticate(user: AuthUser, opts: CreateUserTokenOptions): Promise<AuthUserToken> {
    this.setUser(user);
    const token = await this.setRefreshToken(opts);
    await this.setAccessToken();
    return token;
  }

  public async getAbility(): Promise<AuthContextConfig["ability"]> {
    const user = await this.getUser();
    return await this.opts.createAbility(this.app, user);
  }

  public async can(...args: Parameters<AuthContextConfig["ability"]["can"]>): Promise<void> {
    const ability = await this.getAbility();
    if (!ability.can(...args)) {
      throw HttpError.unauthorized();
    }
  }

  /**
   * Create and set `userToken` to `refreshSession`.
   *
   * Throws {@link MissingUserError} if user does not exist.
   */
  public async setRefreshToken(opts: CreateUserTokenOptions): Promise<AuthUserToken> {
    const user = await this.getUser();
    if (!user) {
      throw new MissingUserError();
    }
    const userToken = await this.opts.createUserToken(this.app, user, opts);
    this.req.refreshSession.set("userToken", userToken.id);
    return userToken;
  }

  /**
   * Set `userToken` to `session`.
   *
   * Throws {@link MissingRefreshTokenError} if userToken does not exist on `refreshSession`.
   */
  public async setAccessToken(): Promise<void> {
    const req = this.req;
    const userToken = req.refreshSession.userToken;
    if (!userToken) {
      throw new MissingRefreshTokenError();
    }
    req.session.set("userToken", userToken);
  }
}
