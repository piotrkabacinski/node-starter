import express from 'express';

import dbConnect from './db/index';

import rootRouter from './routes/root';
import todosRouter from './routes/todos';

import { config as envConfig } from 'dotenv';

envConfig();

(async () => {
  const app = express();
  const port = 3000;

  await dbConnect();

  app.use('/', rootRouter);
  app.use('/todos', todosRouter);

  app.listen(port, () => {
    console.log(`Server's up! http://localhost:${port} 🚀`);
  });
})();
