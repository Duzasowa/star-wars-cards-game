import express from "express";
import {
  createUser,
  getNumUser,
  updateUserWins,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getNumUser).post(createUser);

router.route("/:id").patch(updateUserWins);

export default router;
