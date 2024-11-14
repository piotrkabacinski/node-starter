import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

const {
  POSTGRES_HOST: host,
  POSTGRES_PORT: port,
  POSTGRES_USER: user,
  POSTGRES_PASSWORD: password,
  POSTGRES_DB: db,
} = process.env;

export const datasourceUrl = `postgresql://${user}:${password}@${host}:${port}/${db}?schema=public`;

const logs: Record<typeof process.env.NODE_ENV, PrismaClientOptions['log']> = {
  "development": ['error'],
  "production": ['query', 'warn', 'error'],
  "test": ["warn", "error"]
};

const prisma = new PrismaClient({
  datasourceUrl,
  log: logs[process.env.NODE_ENV]
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
