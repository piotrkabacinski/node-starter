import redis from "redis";
import url from "url";

const getConfig = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    };
  }

  const { port, hostname, href } = url.parse(process.env.REDIS_URL);

  return {
    no_ready_check: true,
    password: /\/\/:(.*?)@/.exec(href)[1],
    host: hostname,
    port: Number(port),
  };
};

const client = redis.createClient(getConfig());

// For easier mocking, created redis client is wrapped in a function:
export const getRedisClient = () => client;
