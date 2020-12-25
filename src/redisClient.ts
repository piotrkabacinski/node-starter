import redis from "redis";

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

// For easier mocking, created redis client is wrapped in a function:
export const getRedisClient = () => client;
