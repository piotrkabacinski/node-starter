import { datasourceUrl, prismaQuery } from "./src/db";
import { execSync } from "child_process";
import { vi, afterEach, afterAll, beforeAll } from "vitest";

let tables: string[] = [];

vi.mock("src/redisClient", () => ({
  getRedisClient: () => ({
    isOpen: true,
    connect: Promise.resolve(),
    get: vi.fn(),
    incr: vi.fn(),
    set: vi.fn(),
  }),
}));

vi.mock("bullmq", () => {
  return {
    Queue: vi.fn().mockImplementation(function () {
      return {
        add: vi.fn(),
      };
    }),
    Worker: vi.fn().mockImplementation(function () {
      return {
        on: vi.fn(),
      };
    }),
  };
});

const clearTestTables = async () => {
  await prismaQuery(async (client) => {
    for (const table of tables) {
      // https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate
      await client.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    }
  });
};

beforeAll(async () => {
  execSync(`DATABASE_URL=${datasourceUrl} prisma migrate dev --name test`);

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
    `DATABASE_URL=${datasourceUrl} prisma migrate reset \
    --force`,
  );

  vi.resetAllMocks();
});
