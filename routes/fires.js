import express from "express";
import multer from "multer";
import {
  getLocations,
  getHighConfidence,
  analyzeImage,
  chatWithAI, // Import the new function
} from "../Services/pythonService.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/get_locations", async (req, res) => {
  try {
    const data = await getLocations(req.body);
    res.setHeader("Content-Type", "text/html");
    res.send(data.html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "get_locations failed" });
  }
});

router.post("/get_hight_regions_area", async (req, res) => {
  try {
    const data = await getHighConfidence(req.body);
  
    if (typeof data.data === "string") {
      try {
        data.data = JSON.parse(data.data);
      } catch (e) {
        console.error("JSON parse failed", e);
      }
    }
  
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "get_hight_regions_area failed" });
  }
});

router.post("/draw_boxes_fire", upload.single("image"), async (req, res) => {
  try {
    const result = await analyzeImage(req.file);
  
    res.json({
      image_base64: result.data,
      format: "jpeg",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "draw_boxes_fire failed" });
  }
});

// --- NEW ROUTE ADDED BELOW ---
router.post("/chat", async (req, res) => {
  try {
    const { user_id, message } = req.body;

    // Basic validation
    if (!user_id || !message) {
      return res.status(400).json({ error: "user_id and message are required" });
    }

    const response = await chatWithAI({ user_id, message });
    res.json(response);
  } catch (error) {
    console.error("Chat API Error:", error.message);
    res.status(500).json({ error: "AI chat request failed" });
  }
});

export default router;