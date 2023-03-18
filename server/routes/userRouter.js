import express from "express";
import { createUser, getNumUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getNumUser).post(createUser);

export default router;
