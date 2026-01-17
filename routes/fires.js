import express from "express";
import multer from "multer";
import {
  getLocations,
  getHighConfidence,
  analyzeImage,
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



export default router;
