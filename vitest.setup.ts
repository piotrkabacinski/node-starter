import { prismaQuery } from "./src/db";
import { vi, afterEach, afterAll, beforeAll } from "vitest";

let tables: string[] | undefined = undefined;

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
  if (Array.isArray(tables) === false) {
    return;
  }

  await prismaQuery(async (client) => {
    for (const table of tables as string[]) {
      // https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate
      await client.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    }
  });
};

beforeAll(async () => {
  if (Array.isArray(tables)) {
    return;
  }

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
  vi.resetAllMocks();
});
