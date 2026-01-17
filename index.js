import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import firesRoutes from "./routes/fires.js";

dotenv.config();

const app = express();


const corsOptions = {
  origin: [
    "https://fire-detection-system-one.vercel.app",
    "https://fire-detection-system-one.vercel.app/",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  credentials: true
};


app.use(express.json());


app.use("/api/fires", firesRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

export default app;
