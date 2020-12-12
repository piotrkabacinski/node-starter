import express from 'express';
import bodyParser from 'body-parser';
import { middleware } from 'express-openapi-validator';

import dbConnect from './db/index';

import rootRouter from './routes/root';
import todosRouter from './routes/todos';

import { config as envConfig } from 'dotenv';

envConfig();

(async () => {
  const app = express();
  const port = Number(process.env.PORT);

  await dbConnect();

  app
    .use(bodyParser.json())
    .use(
      bodyParser.urlencoded({
        extended: true,
      })
    )
    .use('/', (_, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/json');

      next();
    })
    .use(
      middleware({
        apiSpec: `${__dirname}/../src/openapi.yaml`,
        validateRequests: true
      })
    )
    .use((err, _, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    })
    .use('/', rootRouter)
    .use('/todos', todosRouter)

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
