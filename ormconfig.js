/* eslint-disable */
const envConfig = require('dotenv').config;

envConfig();

const productionConfig = {
  synchronize: false,
  url: process.env.DATABASE_URL,
  logging: true,
  // https://github.com/typeorm/typeorm/issues/278#issuecomment-614345011
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

const developmentConfig = {
  synchronize: true,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  port: process.env.POSTGRES_PORT,
}

module.exports = {
  logging: true,
  type: "postgres",
  entities: ["src/db/entity/**/*.ts"],
  migrations: ["src/db/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    migrationsDir: "src/db/migration"
  },
  ...(process.env.NODE_ENV === "production" ? productionConfig : developmentConfig)
}
