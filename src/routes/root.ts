import { Router } from "express";
import rootController from "src/controllers/root.js";

export default (() => {
  const router = Router();

  router.get("/", rootController);

  return router;
})();
