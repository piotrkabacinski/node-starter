import redis from "redis";

const client = redis.createClient({
  host: process.env.REDIS_HOST,

  // no_ready_check is required for Heroku's Redis connection
  // https://github.com/RedisLabs/rediscloud-node-sample/blob/master/web.js#L7
  no_ready_check: process.env.NODE_ENV === "production" ? true : undefined,
  port: Number(process.env.REDIS_PORT),
});

// For easier mocking, created redis client is wrapped in a function:
export const getRedisClient = () => client;
