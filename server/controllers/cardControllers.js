import Card from "../models/cardModel.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export const getAllCard = async (req, res) => {
  const features = new APIFeatures(Card.find(), req.query).pagination();
  const cards = await features.query;

  res.status(200).json({
    status: "success",
    result: cards.length,
    cards,
  });
};

export const createCard = async (req, res) => {
  const newCard = await Card.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      card: newCard,
    },
  });
};
