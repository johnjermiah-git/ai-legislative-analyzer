import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import analyzeRoutes from "./routes/analyzeRoutes.js"; // 👈 ADD THIS

dotenv.config({ path: "./.env" });

import fs from "fs";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.text({ limit: "10mb" }));

// Routes
app.use("/api", analyzeRoutes); // 👈 ADD THIS

// Test route
app.get("/", (req, res) => {
  res.send("AI Legislative Analyzer API is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});