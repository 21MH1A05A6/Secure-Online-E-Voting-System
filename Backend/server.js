// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const electionRoutes = require("./routes/electionRoutes");
const voterRoutes=require("./routes/voterRoutes");

const app = express();

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (for uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Allows access to images via "/uploads"

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/elections", electionRoutes); 
app.use("/api/voters",voterRoutes);
// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
