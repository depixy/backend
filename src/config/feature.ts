import { Type } from "@sinclair/typebox";

export const feature = Type.Object({}, {
  additionalProperties: false,
  description: "All features related configuration",
  title: "Feature Configuration"
});
