/* eslint-disable */
const envConfig = require('dotenv').config;

envConfig();

module.exports = {
  "synchronize": true,
  "database": process.env.POSTGRES_DB,
  "host": process.env.POSTGRES_HOST,
  "password": process.env.POSTGRES_PASSWORD,
  "username": process.env.POSTGRES_USER,
  "logging": true,
  "port": process.env.POSTGRES_PORT,
  "type": "postgres",
  "entities": ["src/db/entity/**/*.ts"],
  "migrations": ["src/db/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "migrationsDir": "src/db/migration"
  }
}
