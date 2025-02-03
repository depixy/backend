import { isIP } from "node:net";
import type { FastifyInstance } from "fastify";

export interface ParseIpOptions {
  /**
   * Determine IP by custom header.
   * `fastify.trustProxy` is required to be `true`.
   */
  ipHeader?: string;
  trustProxy: boolean;
}

export function addParseIp(app: FastifyInstance, opts: ParseIpOptions): void {
  const { ipHeader: realIpHeader, trustProxy } = opts;
  if (!realIpHeader || !trustProxy) {
    return;
  }
  app.addHook("onRequest", async req => {
    const ipHeader = req.headers[realIpHeader];
    if (!ipHeader) {
      return;
    }
    let ip: string;
    if (Array.isArray(ipHeader)) {
      ip = ipHeader[0] ?? "";
    } else {
      ip = ipHeader;
    }
    if (isIP(ip)) {
      Object.defineProperty(req, "ip", {
        get() {
          return ip;
        }
      });
    }
  });
}
