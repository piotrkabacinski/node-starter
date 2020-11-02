import express from "express";
import { getCustomRepository } from "typeorm";
import connection from "./db/db";
import { TodosRepository } from "./db/repository/TodoRepository";

const app = express();
const port = 3000;

app.get("/typeorm", async (_, res) => {
  res.set("Content-Type", "application/json");

  await connection();

  const todosRepository = getCustomRepository(TodosRepository);

  await todosRepository.addTodo();
  const todos = await todosRepository.getTodos();

  res.send({
    todos,
    date_time: new Date().toISOString(),
  });
});

app.get("/", async (_, res) => {
  res.set("Content-Type", "application/json");

  res.send({
    date_time: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server's up! http://localhost:${port} 🚀`);
});
