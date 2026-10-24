const User = require("../models/user.model");
const asyncHandler = require("../utils/async-handler");

const createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ data: user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json({ data: users });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ data: user });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
});

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
