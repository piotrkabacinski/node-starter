import { Router } from "express";
import rootController from "../controllers/rootController";

function rootRouter() {
  const router = Router();

  router.get("/", rootController);

  return router;
}

export default rootRouter();
