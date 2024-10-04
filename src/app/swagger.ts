import swaggerPlugin from "@fastify/swagger";
import scalarPlugin from "@scalar/fastify-api-reference";

import type { FastifyInstance } from "fastify";

const description = `
Swagger for Depixy API
## Query Parameters
For object in query parameters, it uses [qs](https://github.com/ljharb/qs) syntax.
For example,
\`\`\`txt
a[0][b]=1&c=true
\`\`\`
is equivalence to
\`\`\`json
{ "a": [{ "b": 1 }], "c": true }
 \`\`\`
`;

const title = "Depixy API";

export async function initSwagger(app: FastifyInstance): Promise<void> {
  await app.register(swaggerPlugin, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title,
        description,
        version: "1.0.0"
      }
    }
  });
  await app.register(scalarPlugin, {
    routePrefix: "/api",
    configuration: {
      defaultOpenAllTags: true,
      metaData: { title }
    }
  });
}
