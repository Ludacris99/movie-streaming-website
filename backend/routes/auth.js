// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// Signup
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "User registered successfully" });
  });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

module.exports = router;
