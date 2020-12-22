import { config as envConfig } from 'dotenv';
import dbConnect from '../db';

before(async () => {
  envConfig();
  await dbConnect();
});
