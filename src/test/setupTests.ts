import { config as envConfig } from "dotenv";
import {
  Connection,
  createConnection,
  getConnectionOptions,
  QueryRunner,
} from "typeorm";

let connection: Connection;
let testDB: string;
let queryRunner: QueryRunner;

before(async () => {
  envConfig();

  testDB = `${process.env.POSTGRES_DB + "_test"}`;

  console.info(`Create DB: ${testDB}`);

  const connectionOptions = await getConnectionOptions();

  Object.assign(connectionOptions, {
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    type: "postgres",
    logging: false,
    username: process.env.POSTGRES_USER,
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
  console.info(`Drop DB: ${testDB}`);

  await queryRunner.dropDatabase(testDB);
  await connection.close();
});
