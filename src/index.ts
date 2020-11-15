import express from "express";
import bodyParser from "body-parser";

import dbConnect from "./db/index";

import rootRouter from "./routes/root";
import todosRouter from "./routes/todos";

import { config as envConfig } from "dotenv";

envConfig();

(async () => {
  const app = express();
  const port = Number(process.env.PORT);

  await dbConnect();

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use("/", (_, response, next) => {
    response.setHeader("Content-Type", "application/json");
    next();
  });

  app.use("/", rootRouter);
  app.use("/todos", todosRouter);

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
