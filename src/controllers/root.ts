import { Response } from "express";
import redis, { RedisClient } from "redis";

const incrementVisits = (redisClient: RedisClient) =>
  new Promise((resolve) => {
    const key = "value";

    redisClient.get(key, (_, replay) => {
      if (replay) {
        redisClient.incr(key);
        resolve(replay);
      } else {
        redisClient.set(key, "1");
        resolve("1");
      }
    });
  });

export default async function (_, res: Response) {
  const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  const visits = await incrementVisits(redisClient);

  res.send({
    date_time: new Date().toISOString(),
    visits,
  });
}
