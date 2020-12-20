import { Router } from "express";
import { getUsers, createUser, getUser } from "../controllers/users";

export default (() => {
  const router = Router();

  router.get("/", getUsers);
  router.post("/", createUser);
  router.get("/:id", getUser);

  return router;
})();
