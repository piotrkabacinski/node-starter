import { PrismaClient } from "@prisma/client";

const {
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: db,
} = process.env;

export const datasourceUrl = `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`;

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
