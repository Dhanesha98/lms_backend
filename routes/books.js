const express = require("express");
const { db } = require("../sqlite");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, author, category } = req.body;
  const stmt = db.prepare("INSERT INTO books (title, author, category) VALUES (?, ?, ?)");
  stmt.run(title, author, category, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

router.put("/:id", (req, res) => {
  const { title, author, category, available } = req.body;
  db.run("UPDATE books SET title = ?, author = ?, category = ?, available = ? WHERE id = ?",
    [title, author, category, available, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

router.delete("/:id", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
