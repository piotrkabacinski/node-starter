import { Router } from "express";
import { getTodos, addTodo } from "../controllers/todos";

export default (() => {
  const router = Router();

  router.get("/", getTodos);
  router.post("/", addTodo);

  return router;
})();
