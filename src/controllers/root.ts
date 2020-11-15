import { Response } from "express";

export default function (_, res: Response) {
  res.send({
    date_time: new Date().toISOString(),
  });
}
