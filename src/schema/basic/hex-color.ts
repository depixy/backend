import { FormatRegistry, Type } from "@sinclair/typebox";

FormatRegistry.Set("hex-color", value => /^#(?:(?:[\da-fA-F]{3}){1,2}|(?:[\da-fA-F]{4}){1,2})$/iu.test(value));

export const hexColorSchema = Type.String({
  description: "sRGB color in hexadecimal numbers. Support #RRGGBB and #RRGGBBAA",
  example: "#000000",
  format: "hex-color"
});
