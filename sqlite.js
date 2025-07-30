const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./library.db");

function initDB() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'student'
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      category TEXT,
      available INTEGER DEFAULT 1
    )`);
  });
}

module.exports = { db, initDB };
