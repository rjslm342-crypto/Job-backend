const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());              // ⭐ VERY IMPORTANT
app.use(express.json());      // ⭐ JSON read karne ke liye

let profiles = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Get all profiles
app.get("/api/profiles", (req, res) => {
  res.json(profiles);
});

// Add profile (POST)
app.post("/api/profiles", (req, res) => {
  const { name, qualification, skills, mobile } = req.body;

  if (!name || !qualification || !skills || !mobile) {
    return res.status(400).json({ error: "All fields required" });
  }

  profiles.push({ name, qualification, skills, mobile });

  res.json({ success: true, message: "Profile added" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
