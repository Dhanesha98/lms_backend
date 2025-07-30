# 📚 Library Management System Backend

This is the backend for your Library Management System project. It uses **Express.js**, **SQLite** (file-based), and **JWT authentication**. You're expected to build the **frontend using React** and connect it to this API.

---

## 🛠 Features

- Signup / Signin with JWT auth
- Users management (admin + student roles)
- Books management (CRUD)
- SQLite database stored in `library.db`
- Sample users and books included

---

## 📦 Getting Started

### 1. Install dependencies

```bash
npm install
```



📘 API Documentation – Library Management System

Base URL: http://localhost:5000/api

---

🔐 Authentication

➕ POST /auth/signup

Create a new user account.

Request Body:
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN_HERE"
}

---

🔑 POST /auth/signin

Login to get a JWT token.

Request Body:
{
  "email": "alice@example.com",
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN_HERE"
}

Use this token for all routes below.
Add the following header:

Authorization: Bearer YOUR_TOKEN

---

📚 Books

📖 GET /books

Get a list of all books

Response:
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "category": "Fiction",
    "available": 1
  },
  ...
]

---

➕ POST /books

Add a new book

Request Body:
{
  "title": "1984",
  "author": "George Orwell",
  "category": "Dystopian"
}

Response:
{
  "id": 4
}

---

📝 PUT /books/:id

Update a book

Example URL:
PUT /books/4

Request Body:
{
  "title": "1984",
  "author": "George Orwell",
  "category": "Classic",
  "available": 1
}

Response:
{
  "updated": 1
}

---

❌ DELETE /books/:id

Delete a book by ID

Example:
DELETE /books/4

Response:
{
  "deleted": 1
}

---

👤 Users (Admin-only)

👥 GET /users

Get a list of users

Response:
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin"
  },
  ...
]

---

📝 PUT /users/:id

Update a user

Request Body:
{
  "name": "Alice J.",
  "role": "admin"
}

Response:
{
  "updated": 1
}

---

❌ DELETE /users/:id

Delete a user

Example:
DELETE /users/3

Response:
{
  "deleted": 1
}

---

🧪 Test Users

You can use these credentials to test the API:

Email: alice@example.com
Password: password123
Role: admin

Email: bob@example.com
Password: password123
Role: student

---
