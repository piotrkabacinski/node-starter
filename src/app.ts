import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { middleware } from "express-openapi-validator";

import rootRouter from "./routes/root";
import usersRouter from "./routes/users";

const srcPath = `${__dirname}/../src`;

const { NODE_ENV: env } = process.env;
const isTest = env === "test";

export default () => {
  const app = express();

  app.use("/static", express.static(`${srcPath}/static`));

  app.use(bodyParser.json()).use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  if (!isTest) {
    app.use(morgan(":method :url :status (:response-time ms)"));
  }

  app.use(
    middleware({
      apiSpec: `${srcPath}/openapi.yaml`,
      validateRequests: true,
      validateResponses: isTest,
    })
  );

  app.use((_req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    next();
  });

  app.use("/", rootRouter).use("/users", usersRouter);

  app.use((err, _req, res, _next) => {
    if (!isTest) {
      console.error(err);
    }

    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  });

  return app;
};
