import express from "express";
import { chatWithAI, getChatHistory } from "../Services/pythonService.js";

const router = express.Router();

// POST /chat
router.post("/", async (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ error: "user_id and message are required" });
  }

  try {
    const data = await chatWithAI(user_id, message);
    res.json(data);
  } catch (error) {
    console.error("Chat API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to communicate with AI assistant" });
  }
});

// GET /chat/history/{user_id}
router.get("/history/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const data = await getChatHistory(user_id);
    res.json(data);
  } catch (error) {
    console.error("History API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;