import { defineConfig } from "@prisma/config";

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export default defineConfig({
  schema: "./src/db/schema.prisma",
  datasource: {
    url: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`,
  },
});
