import { Router } from "express";
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

  return router;
})();
