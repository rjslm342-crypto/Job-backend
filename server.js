const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // frontend se request allow
app.use(express.json());

// File jaha data save hoga
const DATA_FILE = "profiles.json";

/* ================================
   POST: Profile Save API
   ================================ */
app.post("/api/profile", (req, res) => {
  const { name, qualification, skills, contact } = req.body;

  if (!name || !qualification || !skills) {
    return res.status(400).json({
      message: "Name, qualification aur skills required hai"
    });
  }

  let profiles = [];

  if (fs.existsSync(DATA_FILE)) {
    profiles = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  const newProfile = {
    id: Date.now(),
    name,
    qualification,
    skills,
    contact,
    createdAt: new Date()
  };

  profiles.push(newProfile);

  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2));

  res.json({
    message: "Profile successfully saved",
    profile: newProfile
  });
});

/* ================================
   GET: All Profiles (Public)
   ================================ */
app.get("/api/profiles", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) {
    return res.json([]);
  }

  const profiles = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(profiles);
});

/* ================================
   Server Start (Render compatible)
   ================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});