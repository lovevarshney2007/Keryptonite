import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import firesRoutes from "./routes/fires.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://fire-detection-system-one.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(express.json());


app.use("/api/fires", firesRoutes);

app.get("/", (req, res) => {
  res.send("Kryptonite API is running");
});


app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

export default app;
