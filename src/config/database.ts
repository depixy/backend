import { Type } from "@sinclair/typebox";

export const database = Type.Object({
  url: Type.String({
    title: "Database connection string",
    description: "Example: postgresql://depixy:depixy@db:5432/depixy"
  })
}, {
  title: "Database Configuration",
  description: "All database related configuration",
  additionalProperties: false
});
