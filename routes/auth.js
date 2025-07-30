const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../sqlite");
const router = express.Router();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
  stmt.run(name, email, hashedPassword, function (err) {
    if (err) return res.status(400).json({ error: "Email already exists" });
    const token = jwt.sign({ id: this.lastID, email }, process.env.JWT_SECRET);
    return res.json({ token });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET);
    return res.json({ token });
  });
});

module.exports = router;
