import { defineConfig } from "@prisma/config";

if (!process.env.DATABASE_URL) {
  throw new Error("No DATABASE_URL process.env");
}

export default defineConfig({
  schema: "./src/db/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
