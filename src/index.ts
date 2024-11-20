import { config as envConfig } from "dotenv";
import createApp from "./app";
import { envSchema } from "./envSchema";

envConfig();

(async () => {
  envSchema.parse(process.env);

  const app = createApp();
  const port = Number(process.env.APP_PORT);

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
