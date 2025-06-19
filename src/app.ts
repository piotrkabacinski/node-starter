import express, { type Request, type Response } from "express";
import morgan from "morgan";
import { middleware } from "express-openapi-validator";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/root";
import usersRouter from "./routes/users";

const srcPath = `${__dirname}/../src`;

const { NODE_ENV: env } = process.env;
const isTest = env === "test";

export default () => {
  const app = express();

  app.use("/static", express.static(`${srcPath}/static`));

  app.use(cookieParser());

  app.use(express.json()).use(
    express.urlencoded({
      extended: true,
    }),
  );

  if (!isTest) {
    app.use(morgan(":method :url :status (:response-time ms)"));
  }

  app.use(
    middleware({
      apiSpec: `${srcPath}/openapi.yaml`,
      validateRequests: true,
      validateResponses: isTest,
    }),
  );

  app.use((_req, res, next) => {
    res.setHeader("Content-Type", "application/json");

    next();
  });

  app.use("/", rootRouter).use("/users", usersRouter);

  // OpenApi error handler
  app.use(
    (
      err: { message: string; errors: unknown; status: number },
      _req: Request,
      res: Response,
    ) => {
      if (!isTest) {
        console.error(err);
      }

      res.status(err.status).json({
        message: err.message,
        errors: err.errors,
      });
    },
  );

  return app;
};
