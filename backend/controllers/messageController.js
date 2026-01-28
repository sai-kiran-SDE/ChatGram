import Message from "../models/Message.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const message = await Message.create({
      sender: req.user._id,       // ✅ FIXED
      receiver: receiverId,
      text,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// GET MESSAGES BETWEEN TWO USERS
export const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },   // ✅ FIXED
        { sender: userId, receiver: req.user._id },   // ✅ FIXED
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// CLEAR MESSAGES
export const clearMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const otherUserId = req.params.userId;

    await Message.deleteMany({
      $or: [
        { sender: loggedInUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: loggedInUserId },
      ],
    });

    res.status(200).json({ message: "Messages cleared" });
  } catch (error) {
    console.error("Clear messages error:", error);
    res.status(500).json({ message: "Failed to clear messages" });
  }
};
