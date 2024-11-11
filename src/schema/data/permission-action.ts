import { Type } from "@sinclair/typebox";
import type { Static, StaticEncode } from "@sinclair/typebox";

const schema = Type.Union(
  [
    Type.Const("create" as const),
    Type.Const("update" as const),
    Type.Const("delete" as const),
    Type.Const("search" as const),
    Type.Const("detail" as const)
  ],
  {
    description: "Actions that is allowed to perform on subjects.",
    title: "Permission Action"
  }
);

export const permissionActionSchema = Type.Transform(schema)
  .Decode(value => value as string)
  .Encode(value => value as Static<typeof schema>);

export type PermissionAction = StaticEncode<typeof permissionActionSchema>;
