import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import firesRoutes from "./routes/fires.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());


app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://fire-detection-system-one.vercel.app",
        "http://localhost:5173"
      ];
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());


app.use("/api/fires", firesRoutes);
app.use("/chat", chatRoutes);

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
