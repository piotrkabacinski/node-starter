import { datasourceUrl } from "../db/datasourceUrl.js";
import { execSync } from "child_process";

export function setup() {
  execSync(`DATABASE_URL=${datasourceUrl} prisma migrate dev --name test`);
}

export function teardown() {
  execSync(`DATABASE_URL=${datasourceUrl} prisma migrate reset --force`);
}
