import { Response } from "express";

export default function (_, res: Response) {
  res.set("Content-Type", "application/json");

  res.send({
    date_time: new Date().toISOString(),
  });
}
