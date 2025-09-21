import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // optional
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MySQL
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);     // /register, /login
app.use("/api/users", userRoutes);    // /profile, /delete (if separate)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
