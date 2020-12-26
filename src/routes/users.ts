import { Router } from "express";
import { createTodo, getTodo, getTodos } from "../controllers/todos";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
} from "../controllers/users";

export default (() => {
  const router = Router();

  router.get("/", getUsers);
  router.post("/", createUser);
  router.get("/:id", getUser);
  router.delete("/:id", deleteUser);

  router.post("/:id/todos", createTodo);
  router.get("/:id/todos", getTodos);
  router.get("/:id/todos/:uuid", getTodo);

  return router;
})();
