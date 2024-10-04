import { Type } from "@sinclair/typebox";

export const feature = Type.Object({
  userRegistration: Type.Boolean({
    title: "Enable user registration",
    description: "Allow new user to register"
  })
}, {
  title: "Feature Configuration",
  description: "All features related configuration",
  additionalProperties: false
});
