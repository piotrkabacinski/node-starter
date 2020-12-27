import { config as envConfig } from "dotenv";
import { SinonStub, stub } from "sinon";
import redisMock, { RedisClient } from "redis-mock";
import * as redisClient from "src/redisClient";

import {
  Connection,
  createConnection,
  getConnectionOptions,
  QueryRunner,
} from "typeorm";

let connection: Connection;
let testDB: string;
let queryRunner: QueryRunner;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fakeRedis: SinonStub<any[], RedisClient>;

const createTestDB = async () => {
  const dbName = `${process.env.POSTGRES_DB}_test`;

  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    database: undefined,
    synchronize: true,
    logging: false,
  });

  const connection = await createConnection(connectionOptions);

  const queryRunner = connection.createQueryRunner();

  await queryRunner.createDatabase(dbName, true);

  return {
    dbName,
    connection,
    queryRunner,
  };
};

const clearTestTables = async (connection: Connection) => {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    await queryRunner.query(`TRUNCATE ${entity.tableName} CASCADE;`);
  }
};

before(async () => {
  envConfig();

  fakeRedis = stub(redisClient, "getRedisClient").callsFake(() =>
    redisMock.createClient()
  );

  const props = await createTestDB();

  testDB = props.dbName;
  queryRunner = props.queryRunner;
  connection = props.connection;
});

afterEach(async () => {
  await clearTestTables(connection);
});

after(async () => {
  await queryRunner.dropDatabase(testDB);
  await connection.close();

  fakeRedis.restore();
});
