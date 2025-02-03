import { Type } from "@sinclair/typebox";


export const network = Type.Object({
  ipHeader: Type.Optional(Type.String({
    description: "Determine which header to use for client ip.",
    minLength: 1,
    title: "Client IP header"
  })),
  trustProxy: Type.Boolean({
    description: "Enable if the upstream services are trusted, i.e. reverse proxies.",
    title: "Trust proxy headers"
  })
}, {
  additionalProperties: false,
  description: "All network related configuration",
  title: "Network Configuration"
});
