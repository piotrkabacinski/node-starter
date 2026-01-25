import createApp from "./app.js";
import { EnvSchema } from "./EnvSchema.js";

(async () => {
  EnvSchema.parse(process.env);

  const app = createApp();
  const port = Number(process.env.APP_PORT);

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
