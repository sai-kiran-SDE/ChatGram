import express from "express";
import {
  sendMessage,
  getMessages,
  clearMessages, // ✅ ADD THIS
} from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:userId", protect, getMessages);
router.delete("/clear/:userId", protect, clearMessages);

export default router;
