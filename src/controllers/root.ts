import { Response } from "express";
import { createClient } from "redis";
import { getRedisClient } from "src/redisClient";

const visitsKey = "visits";

const incrementVisits = async (
  redisClient: ReturnType<typeof createClient>
): Promise<number> => {
  const value = await redisClient.get(visitsKey);

  if (value) {
    await redisClient.incr(visitsKey);
    return Number(value);
  }

  await redisClient.set(visitsKey, "1");

  return 1;
};

export default async function (_, res: Response) {
  const client = getRedisClient();

  if (!client.isOpen) {
    await client.connect();
  }

  const visits = await incrementVisits(client);

  res.send({
    date_time: new Date().toISOString(),
    visits,
  });
}
