import { Response } from "express";
import { RedisClient } from "redis";
import { getRedisClient } from "src/redisClient";

const incrementVisits = (redisClient: RedisClient): Promise<number> =>
  new Promise((resolve) => {
    const key = "value";

    redisClient.get(key, (_, replay) => {
      if (replay) {
        redisClient.incr(key);
        resolve(Number(replay));
      } else {
        redisClient.set(key, "1");
        resolve(1);
      }
    });
  });

export default async function (_, res: Response) {
  const visits = await incrementVisits(getRedisClient());

  res.send({
    date_time: new Date().toISOString(),
    visits
  });
}
