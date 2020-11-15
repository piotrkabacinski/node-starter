import { Router } from "express";
import { addTodo, getTodos } from "../controllers/todos";

export default (() => {
  const router = Router();

  router.get("/", getTodos);
  router.post("/", addTodo);

  return router;
})();
