import { Type } from "@sinclair/typebox";


const level = Type.Union(
  [
    Type.Const("trace" as const),
    Type.Const("debug" as const),
    Type.Const("info" as const),
    Type.Const("warn" as const),
    Type.Const("error" as const),
    Type.Const("fatal" as const),
    Type.Const("silent" as const)
  ],
  {
    title: "Log Level",
    description: "See https://github.com/depixy/backend/blob/master/src/config/README.md"
  }
);

const request = Type.Union(
  [
    Type.Const("all" as const),
    Type.Const("forbidden" as const),
    Type.Const("error" as const),
    Type.Const("silent" as const)
  ],
  { title: "Log Level" }
);

const database = Type.Union(
  [
    Type.Const("debug" as const),
    Type.Const("info" as const),
    Type.Const("warn" as const),
    Type.Const("error" as const),
    Type.Const("silent" as const)
  ],
  { title: "Log Level" }
);

export const logging = Type.Object({ level, request, database }, {
  title: "Logging Configuration",
  description: "All logging related configuration",
  additionalProperties: false
});
