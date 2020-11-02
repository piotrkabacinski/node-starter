import { Router } from "express";
import getTodosController from "../controllers/getTodosController";

function rootRouter() {
  const router = Router();

  router.get("/", getTodosController);

  return router;
}

export default rootRouter();
