import express from 'express';
import bodyParser from 'body-parser';
import { middleware } from 'express-openapi-validator';
import morgan from 'morgan';

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

  app.use(morgan(':method :url :status (:response-time ms)'))

  app.use(
    middleware({
      apiSpec: `${__dirname}/../src/openapi.json`,
      validateRequests: true,
      validateResponses: true
    })
  )

  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    next();
  });

  app
    .use('/', rootRouter)
    .use('/todos', todosRouter)

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });

  app.listen(port, () => {
    // tslint:disable: no-console
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
