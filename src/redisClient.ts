import { createClient } from "redis";

const getConfig = () => ({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

const client = createClient(getConfig());

// For easier mocking, created redis client is wrapped in a function:
export const getRedisClient = () => client;
