import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A card must have a name"],
    unique: true,
    trim: true,
    maxlength: [15, "A card name must have less or equal then 15 characters"],
    minlength: [5, "A card name must have less or equal then 5 characters"],
  },
  imageCover: {},
  health: {
    type: Number,
    max: [10, "The amount of health on the card must not exceed 10 units"],
    min: [1, "The amount of health of the card must contain at least 1 unit"],
  },
  damage: {
    type: Number,
    max: [10, "The amount of damage on the card must not exceed 10 units"],
    min: [1, "The amount of damage of the card must contain at least 1 unit"],
  },
  rarity: {
    type: String,
    enum: ["gold", "rare", "common"],
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
