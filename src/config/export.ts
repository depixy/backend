import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { schema } from "./index.js";

const stringSchema = JSON.stringify({ ...schema }, null, 2);
const configDirPath = join(import.meta.dirname, "..", "..", "config");
const filePath = join(configDirPath, "config.schema.json");
await writeFile(filePath, stringSchema, { encoding: "utf-8" });
