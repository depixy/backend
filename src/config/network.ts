import { Type } from "@sinclair/typebox";


export const network = Type.Object({
  trustProxy: Type.Boolean({
    title: "Trust proxy headers",
    description: "Enable if the upstream services are trusted, i.e. reverse proxies."
  }),
  ipHeader: Type.String({
    title: "Client IP header",
    description: "Determine which header to use for client ip.",
    minLength: 1
  })
}, {
  title: "Network Configuration",
  description: "All network related configuration",
  additionalProperties: false
});
