import { config as envConfig } from "dotenv";
import { createDatabase, dropDatabase } from "typeorm-extension";
import { getAppDataSourceInstance } from "./src/db/index";
import testDbOptions from "./ormconfig";
import { DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
  type: testDbOptions.type as "postgres",
  database: testDbOptions["database"] as string,
  host: testDbOptions["host"],
  password: testDbOptions["password"],
  username:testDbOptions["username"],
  port: testDbOptions["port"]
};

envConfig();

const clearTestTables = async () => {
  const ads = await getAppDataSourceInstance();

  const entities = ads.entityMetadatas;

  const queryRunner = ads.createQueryRunner();

  for (const entity of entities) {
    await queryRunner.query(`TRUNCATE ${entity.tableName} CASCADE;`);
  }
};

beforeAll(async () => {
  await dropDatabase({
    options,
    initialDatabase: "postgres",
  });

  await createDatabase({
    options,
    ifNotExist: false,
  });
});

afterEach(async () => {
  await clearTestTables();
});

afterAll(async () => {
  const ads = await getAppDataSourceInstance();

  await ads.destroy();

  await dropDatabase({
    options,
  });
});
