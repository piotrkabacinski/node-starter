import { Response } from "express";
// import { type RedisClientType } from "@redis/client";
// import { getRedisClient } from "src/redisClient";
  
// const incrementVisits = async (redisClient: RedisClientType): Promise<number> =>
//   {
//     const key = "value";

//     const value = await redisClient.get(key);

//     if (value) {
//       return await redisClient.incr(key);
//     }

//     await redisClient.set(key, "1");

//     return 1;
//   };

export default async function (_, res: Response) {
  // const client = getRedisClient();

  // try {
  //   await client.connect();
  // } catch (err) {
  //   console.error(err);
  // }

  // const visits = await incrementVisits(client as unknown as any);

  res.send({
    date_time: new Date().toISOString(),
  });
}
