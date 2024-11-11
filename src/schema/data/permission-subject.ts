import { Type } from "@sinclair/typebox";
import type { Static, StaticEncode } from "@sinclair/typebox";

const schema = Type.Union(
  [
    Type.Const("UserToken" as const),
    Type.Const("User" as const),
    Type.Const("TagCategory" as const),
    Type.Const("Tag" as const)
  ],
  {
    description: "Subjects that is allowed to access.",
    title: "Permission Subject"
  }
);

export const permissionSubjectSchema = Type.Transform(schema)
  .Decode(value => value as string)
  .Encode(value => value as Static<typeof schema>);

export type PermissionSubject = StaticEncode<typeof permissionSubjectSchema>;
