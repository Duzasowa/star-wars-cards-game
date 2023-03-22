import User from "../models/userModel.js";
import { tryCatchAsync } from "../routes/tryCatchAsync.js";

export const createUser = tryCatchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const getNumUser = tryCatchAsync(async (req, res) => {
  const users = await User.find(req.query);

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

export const updateUserWins = tryCatchAsync(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { numberWins: 1 } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
});
