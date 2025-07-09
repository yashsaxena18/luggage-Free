// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js"; // adjust path if needed
import bookingRoutes from "./routes/bookingRoutes.js"; // adjust path if needed
import trackRoutes from './routes/trackRoutes.js';

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware  we can use both for prod and dev environments
const allowedOrigins = [
  'http://localhost:5173',
  'https://luggagefree.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop server if DB connection fails
  });

// Routes
app.use("/api/auth", authRoutes); // e.g. /api/auth/register
app.use("/api/bookings", bookingRoutes); // e.g. /api/bookings/create
app.use("/api/track", trackRoutes); // e.g. /api/track/:trackingId

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 LuggageFree Backend is running...");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🌐 Server running on http://localhost:${PORT}`)
);
