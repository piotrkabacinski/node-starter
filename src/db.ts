import { Client } from "pg";
import { config as envConfig } from "dotenv";

envConfig();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: "db",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export default client;
