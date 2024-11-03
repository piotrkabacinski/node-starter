import { DataSourceOptions } from "typeorm";
import { config as envConfig } from "dotenv";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { getAppDataSourceInstance } from "./src/db/index";

import "reflect-metadata";

envConfig();

const dbName = `${process.env.POSTGRES_DB}_test`;

const options: DataSourceOptions = {
  type: "postgres",
  database: dbName,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  port: Number(process.env.POSTGRES_PORT),
};

const clearTestTables = async () => {
  const ads = await getAppDataSourceInstance();

  const entities = ads.entityMetadatas;

  const queryRunner = ads.createQueryRunner();

  for (const entity of entities) {
    await queryRunner.query(`TRUNCATE ${entity.tableName} CASCADE;`);
  }
};

beforeAll(async () => {
  await createDatabase({
    options,
    ifNotExist: false,
  });
}, 10_000);

afterEach(async () => {
  await clearTestTables();
}, 10_000);

afterAll(async () => {
  const ads = await getAppDataSourceInstance();

  await ads.destroy();

  await dropDatabase({
    options,
  });
}, 10_000);
