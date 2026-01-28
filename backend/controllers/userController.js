import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.user._id } }, // ✅ FIX HERE
      "name email"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
