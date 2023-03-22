import Card from "../models/cardModel.js";
import { tryCatchAsync } from "../routes/tryCatchAsync.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export const getAllCard = tryCatchAsync(async (req, res) => {
  const features = new APIFeatures(Card.find(), req.query).pagination();
  const cards = await features.query;

  res.status(200).json({
    status: "success",
    result: cards.length,
    cards,
  });
});

export const createCard = tryCatchAsync(async (req, res) => {
  const newCard = await Card.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      card: newCard,
    },
  });
});

export const getOneRandomCard = tryCatchAsync(async (req, res) => {
  const card = await Card.aggregate([{ $sample: { size: 2 } }]);

  res.status(200).json(card);
});
