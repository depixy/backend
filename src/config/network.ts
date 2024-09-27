import { Type } from "@sinclair/typebox";


export const network = Type.Object({
  trustProxy: Type.Boolean({
    title: "Trust proxy headers",
    description: "Enable if the upstream services are trusted, i.e. reverse proxies."
  })
}, {
  title: "Network Configuration",
  description: "All network related Configuration",
  additionalProperties: false
});
