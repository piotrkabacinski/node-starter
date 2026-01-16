import { defineConfig } from "@prisma/config";
import { datasourceUrl } from "./src/db/index";

export default defineConfig({
  schema: "./src/db/schema.prisma",
  datasource: {
    url: datasourceUrl,
  },
});
