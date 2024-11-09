import { config as envConfig } from "dotenv";
import { prismaQuery } from "./src/db";
import { Prisma } from "@prisma/client";
import { exec } from "child_process";

envConfig();

const clearTestTables = async () => {
  prismaQuery(async (client) => {
    const tableNames: Array<{ table_name: string }> =
      await client.$queryRaw(Prisma.sql`SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
        AND table_type='BASE TABLE';
      `);

    for (const { table_name } of tableNames) {
      // if (!table_name.startsWith("_prisma")) {
        await client.$queryRaw(Prisma.sql`TRUNCATE TABLE \"${table_name}\" CASCADE;`);
      // }
    }
  });
};

beforeAll(async () => {
  exec("NODE_ENV=test POSTGRES_DB=test npm run migration:deploy");
  // await prismaQuery(async (client) => {
  //   await client.$queryRaw(
  //     Prisma.sql`CREATE DATABASE \"${process.env.POSTGRES_DB}\";`
  //   );
  // });
});

// const dropTestDb = async () => {
//   await prismaQuery(async (client) => {
//     await client.$queryRaw(
//       Prisma.sql`DROP DATABASE \"${process.env.POSTGRES_DB}\";'`
//     );
//   });
// };

afterEach(async () => {
  await clearTestTables();
});

// afterAll(dropTestDb);
