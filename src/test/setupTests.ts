import { config as envConfig } from "dotenv";
import { SinonStub, stub } from "sinon";

import redis, { RedisClient } from "redis";
import redisMock from "redis-mock";

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

before(async () => {
  envConfig();

  testDB = `${process.env.POSTGRES_DB + "_test"}`;

  fakeRedis = stub(redis, "createClient").callsFake(redisMock.createClient);

  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USER,
    synchronize: true,
    logging: false,
  });

  connection = await createConnection(connectionOptions);

  queryRunner = connection.createQueryRunner();

  await queryRunner.createDatabase(testDB, true);
});

afterEach(async () => {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const query = `DELETE FROM ${entity.tableName};`;
    await queryRunner.query(query);
  }
});

after(async () => {
  await queryRunner.dropDatabase(testDB);
  await connection.close();

  fakeRedis.restore();
});
