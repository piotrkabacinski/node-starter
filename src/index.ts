import express from "express";
import dbClient from "./db";

const app = express();
const port = 3000;

app.get("/", async (_, res) => {
  res.set("Content-Type", "application/json");

  res.send({
    date_time: new Date().toISOString(),
  });
});

app.get("/db", async (_, res) => {
  res.set("Content-Type", "application/json");

  try {
    await dbClient.connect();

    dbClient.query("SELECT * FROM todo", (_, { rows }) => {
      res.send({
        rows,
      });

      dbClient.end();
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server's up! http://localhost:${port} 🚀`);
});
