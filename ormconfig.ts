import { DataSourceOptions } from "typeorm";
import { config as envConfig } from "dotenv";

envConfig();

const productionConfig: DataSourceOptions = {
  type: "postgres",
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

const developmentConfig: DataSourceOptions = {
  type: "postgres",
  synchronize: true,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  port: Number(process.env.POSTGRES_PORT),
};

const testConfig: DataSourceOptions = {
  ...developmentConfig,
  database: `${process.env.POSTGRES_DB}_test`,
  
};

const configs: Record<typeof process.env.NODE_ENV, DataSourceOptions> = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
};

const dataSourceOptions: DataSourceOptions = {
  logging: true,
  migrations: ["src/db/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  ...configs[process.env.NODE_ENV],
};

export default dataSourceOptions;
