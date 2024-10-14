import { isIP } from "node:net";
import type { FastifyInstance, FastifyRequest } from "fastify";

const ipSymbol = Symbol("ip");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function decorateIp(header: string) {
  return {
    getter(this: FastifyRequest): string {
      if (this[ipSymbol]) {
        return this[ipSymbol];
      }
      const ipHeader = this.headers[header];
      if (!ipHeader) {
        this[ipSymbol] = this.socket?.remoteAddress ?? "";
        return this[ipSymbol];
      }
      const ip = Array.isArray(ipHeader)
        ? ipHeader.find(ip => isIP(ip) !== 0)
        : isIP(ipHeader) !== 0 ? ipHeader : undefined;
      if (!ip) {
        this[ipSymbol] = this.socket?.remoteAddress ?? "";
        return this[ipSymbol];
      }
      this[ipSymbol] = ip;
      return ip;
    }
  };
}

interface CustomIpParsingOptions {
  header: string;
  trustProxy: boolean;
}

export function addCustomIpParsing(app: FastifyInstance, opts: CustomIpParsingOptions): void {
  const { header, trustProxy } = opts;
  app.decorateRequest(ipSymbol);
  if (trustProxy) {
    app.addHook("onRequest", async req => {
      Object.defineProperty(req, "ip", { get: decorateIp(header).getter.bind(req) });
    });
  } else {
    app.decorateRequest("ip", decorateIp(header));
  }
}

declare module "fastify" {
  interface FastifyRequest {
    [ipSymbol]?: string;
  }
}
