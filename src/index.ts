import { createApp } from "#app";
import { readConfig } from "#config";

async function main(): Promise<void> {
  const cfg = await readConfig();
  const app = await createApp(cfg);

  app.listen({ port: 8080 }, err => {
    if (err) {
      app.log.error({ err }, "Failed to start server");
      process.exit(1);
    }
  });
}

await main();
