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
    description: "See https://github.com/depixy/backend/blob/master/src/config/README.md",
    title: "Log Level"
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

const format = Type.Union(
  [
    Type.Const("pretty" as const),
    Type.Const("json" as const)
  ],
  { title: "Log format" }
);

export const logging = Type.Object({
  database,
  format,
  level,
  request
}, {
  additionalProperties: false,
  description: "All logging related configuration",
  title: "Logging Configuration"
});
