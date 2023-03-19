import express from "express";
import { createCard, getAllCard } from "../controllers/cardControllers.js";

const router = express.Router();

router.route("/").get(getAllCard).post(createCard);

export default router;
