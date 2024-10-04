import { FormatRegistry, Type } from "@sinclair/typebox";

import type { StringOptions, TString } from "@sinclair/typebox";

// eslint-disable-next-line prefer-named-capture-group
FormatRegistry.Set("uuid", v => /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/iu.test(v));

export function uuidSchema(options?: StringOptions): TString {
  return Type.String({ ...options, format: "uuid", example: "00000000-0000-0000-0000-000000000000" });
}
