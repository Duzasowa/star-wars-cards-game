import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
    trim: true,
    maxlength: [15, "A user name must have less or equal then 15 characters"],
    minlength: [5, "A user name must have less or equal then 5 characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
