import { Type } from "@sinclair/typebox";

export const database = Type.Object({
  url: Type.String({
    description: "Example: postgresql://depixy:depixy@db:5432/depixy",
    title: "Database connection string"
  })
}, {
  additionalProperties: false,
  description: "All database related configuration",
  title: "Database Configuration"
});
