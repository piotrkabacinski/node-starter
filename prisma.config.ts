import { defineConfig } from "@prisma/config";
import { datasourceUrl } from "./src/db/datasourceUrl";

export default defineConfig({
  schema: "./src/db/schema.prisma",
  datasource: {
    url: datasourceUrl,
  },
});
