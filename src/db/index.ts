import { PrismaClient } from "@prisma/client";

import { config as envConfig } from "dotenv";

envConfig();

const datasourceUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}?schema=public`;

console.log(datasourceUrl);

export const prisma = new PrismaClient({
  datasourceUrl,
  log: process.env.NODE_ENV !== "production" ? ['query', 'info', 'warn', 'error'] : undefined,
});

export const prismaQuery = async <T>(query: (client: typeof prisma) => T) => {
  try {
    await prisma.$connect();
    return await query(prisma);
  } catch (err) {
    console.log(err);
    // process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
