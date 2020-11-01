import express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.set("Content-Type", "application/json");
  res.send({
    hello: "World",
    date: new Date(),
  });
});

app.listen(port, () => {
  console.log(`Server's up! http://localhost:${port} 🚀`);
});
