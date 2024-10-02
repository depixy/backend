import { FormatRegistry, Type } from "@sinclair/typebox";
import { DateTime } from "luxon";

FormatRegistry.Set("date-time", value => DateTime.fromISO(value).isValid);

export const dateTimeSchema = Type.Transform(Type.String({
  format: "date-time",
  example: "2000-01-01T00:00:00+00:00",
  description: "Date time in ISO8601 format"
}))
  .Decode(value => DateTime.fromISO(value, { zone: "UTC" }).toJSDate())
  .Encode(value => value.toISOString());
