import { z } from "zod";

export const EnvSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  NODE_ENV: z.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test"),
  ]),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  APP_PORT: z.string(),
  REDIS_URL: z.string().optional(),
});
