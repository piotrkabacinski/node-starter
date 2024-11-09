import { PrismaClient } from "@prisma/client";

import { config as envConfig } from "dotenv";

envConfig();

const datasourceUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DB}?schema=public`;

const prisma = new PrismaClient({
  datasourceUrl,
  log: process.env.NODE_ENV === "development" ? ['query', 'info', 'warn', 'error'] : undefined,
});

export const createPrismaQuery = (prismaClient: PrismaClient) => async <T>(query: (client: typeof prisma) => T) => {
  try {
    await prismaClient.$connect();
    return await query(prisma);
  } catch (err) {
    console.error(err);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  } finally {
    await prismaClient.$disconnect();
  }
};

export const prismaQuery = createPrismaQuery(prisma);
