import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import firesRoutes from "./routes/fires.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "https://fire-detection-system-one.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  })
);

app.options("*", cors());


app.use("/api/fires", firesRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

export default app;
