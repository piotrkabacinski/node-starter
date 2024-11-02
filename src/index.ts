import { config as envConfig } from "dotenv";
import createApp from "./app";

envConfig();

(async () => {
  const app = createApp();
  const port = Number(process.env.APP_PORT);

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
