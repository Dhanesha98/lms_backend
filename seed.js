const { db, initDB } = require("./sqlite");

initDB();

const users = [
  { name: "Alice Johnson", email: "alice@example.com", password: "$2a$10$eB0bZfRxFhzpbgazZKY8xufqpU8rFkhzAZvDGl0MWq1MvpuHQt5hW", role: "admin" }, // password: password123
  { name: "Bob Smith", email: "bob@example.com", password: "$2a$10$eB0bZfRxFhzpbgazZKY8xufqpU8rFkhzAZvDGl0MWq1MvpuHQt5hW", role: "student" }
];

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science" }
];

users.forEach(user => {
  db.run("INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.password, user.role]);
});

books.forEach(book => {
  db.run("INSERT INTO books (title, author, category) VALUES (?, ?, ?)",
    [book.title, book.author, book.category]);
});

console.log("✅ Sample data inserted.");
