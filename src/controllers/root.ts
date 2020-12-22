import { Response } from "express";
import redis from "redis";

const client = redis.createClient({
  host: "redis",
});

const incrementVisits = () =>
  new Promise((resolve) => {
    const key = "value";

    client.get(key, (_, replay) => {
      if (replay) {
        client.incr(key);
        resolve(replay);
      } else {
        client.set(key, "1");
        resolve("1");
      }
    });
  });

export default async function (_, res: Response) {
  res.send({
    date_time: new Date().toISOString(),
    visits: await incrementVisits(),
  });
}
