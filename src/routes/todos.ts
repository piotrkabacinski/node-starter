import { Router } from "express";
import { addTodo, getTodos, getTodo } from "../controllers/todos";

export default (() => {
  const router = Router();

  router.get("/", getTodos);
  router.post("/", addTodo);
  router.get("/:id", getTodo)

  return router;
})();
