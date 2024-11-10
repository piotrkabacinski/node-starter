import { datasourceUrl, prismaQuery } from "./src/db";
import { execSync } from "child_process";

let tables: string[] = [];

jest.mock("src/redisClient", () => ({
  getRedisClient: () => ({
    isOpen: true,
    connect: Promise.resolve(),
    get: jest.fn(),
    incr: jest.fn(),
    set: jest.fn(),
  }),
}));

const clearTestTables = async () => {
  await prismaQuery(async (client) => {
    for (const table of tables) {
      // https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate
      await client.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    }
  });
};

beforeAll(async () => {
  execSync(
    `DATABASE_URL=${datasourceUrl} npx prisma migrate dev \
    --name test`
  );

  await prismaQuery(async (client) => {
    const tableNames: Array<{ table_name: string }> =
      await client.$queryRaw`SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';
      `;

    tables = tableNames
      .filter(({ table_name }) => !table_name.startsWith("_prisma_"))
      .map(({ table_name }) => table_name);
  });
});

afterEach(async () => {
  await clearTestTables();
});

afterAll(() => {
  // https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-records-with-prisma-migrate
  execSync(
    `DATABASE_URL=${datasourceUrl} npx prisma migrate reset \
    --force`
  );

  jest.resetAllMocks();
});
