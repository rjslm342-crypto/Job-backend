const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "profiles.json";

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/profile", (req, res) => {
  const { name, qualification, skills, contact } = req.body;

  if (!name || !qualification || !skills) {
    return res.status(400).json({ message: "Missing fields" });
  }

  let profiles = [];
  if (fs.existsSync(DATA_FILE)) {
    profiles = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  profiles.push({
    id: Date.now(),
    name,
    qualification,
    skills,
    contact
  });

  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2));
  res.json({ message: "Profile saved" });
});

app.get("/api/profiles", (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  res.json(JSON.parse(fs.readFileSync(DATA_FILE)));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
