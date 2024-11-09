import { config as envConfig } from "dotenv";
import { datasourceUrl, prismaQuery } from "./src/db";
import { execSync } from "child_process";

envConfig();

const clearTestTables = async () => {
  await prismaQuery(async (client) => {
    const tableNames: Array<{ table_name: string }> =
      await client.$queryRaw`SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';
      `;

    for (const tableName of tableNames) {
      if (tableName.table_name.startsWith("_prisma_")) continue;

      // https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate
      await client.$executeRawUnsafe(
        `TRUNCATE TABLE "${tableName.table_name}" CASCADE;`
      );
    }
  });
};

beforeAll(() => {
  execSync(
    `DATABASE_URL=${datasourceUrl} npx prisma migrate dev \
    --name test`
  );
});

afterEach(async () => {
  await clearTestTables();
});

afterAll(() => {
  execSync(
    `DATABASE_URL=${datasourceUrl} npx prisma migrate reset \
    --force`
  );
});
