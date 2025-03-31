import { Type } from "@sinclair/typebox";

const s3Storage = Type.Object({
  accessKey: Type.String({ minLength: 1 }),
  bucket: Type.String({ minLength: 1 }),
  endpoint: Type.Optional(Type.String({ minLength: 1 })),
  region: Type.Optional(Type.String({ minLength: 1 })),
  secretKey: Type.String({ minLength: 1 }),
  type: Type.Const("s3" as const)
});
const localStorage = Type.Object({
  baseDir: Type.String({ minLength: 1 }),
  type: Type.Const("local" as const)
});

export const storage = Type.Object({ file: Type.Union([s3Storage, localStorage]) }, {
  additionalProperties: false,
  description: "All storage related configuration",
  title: "Storage Configuration"
});
