import { Type } from "@sinclair/typebox";

export const feature = Type.Object({}, {
  title: "Feature Configuration",
  description: "All features related configuration",
  additionalProperties: false
});
