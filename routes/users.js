const express = require("express");
const { db } = require("../sqlite");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  db.all("SELECT id, name, email, role FROM users", [], (err, rows) => {
    res.json(rows);
  });
});

router.put("/:id", (req, res) => {
  const { name, role } = req.body;
  db.run("UPDATE users SET name = ?, role = ? WHERE id = ?", [name, role, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
