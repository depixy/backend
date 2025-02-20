import { Type } from "@sinclair/typebox";

export const database = Type.Object({
  url: Type.String({
    description: "Example: file:./dev.db",
    title: "Database connection string"
  })
}, {
  additionalProperties: false,
  description: "All database related configuration",
  title: "Database Configuration"
});
