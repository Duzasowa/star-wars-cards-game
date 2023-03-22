import express from "express";
import {
  createCard,
  getAllCard,
  getOneRandomCard,
} from "../controllers/cardControllers.js";

const router = express.Router();

router.route("/").get(getAllCard).post(createCard);
router.route("/random").get(getOneRandomCard);

export default router;
