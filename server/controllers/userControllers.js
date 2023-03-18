import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
};

export const getNumUser = async (req, res) => {
  const users = await User.find(req.query);

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
};
