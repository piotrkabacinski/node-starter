import { Router } from "express";
import {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from "src/controllers/todos";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
} from "src/controllers/users";

export default (() => {
  const router = Router();

  router.get("/", getUsers);
  router.post("/", createUser);
  router.get("/:userId", getUser);
  router.delete("/:userId", deleteUser);

  router.post("/:userId/todos", createTodo);
  router.get("/:userId/todos", getTodos);
  router.get("/:userId/todos/:uuid", getTodo);
  router.delete("/:userId/todos/:uuid", deleteTodo);
  router.patch("/:userId/todos/:uuid", updateTodo);

  return router;
})();
