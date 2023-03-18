import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
    maxlength: [15, "A tour name must have less or equal then 40 characters"],
    minlength: [5, "A tour name must have less or equal then 10 characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
