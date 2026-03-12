# 📚 Library Management System — REST API

A production-ready **University Library Management System** built with **Node.js**, **Express.js**, and **MongoDB**. This API allows administrators to manage books including adding, viewing, updating, deleting, and searching the library catalog.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |

---

## 📁 Project Structure

```
library-backend/
│
├── config/
│   └── db.js               # MongoDB connection
│
├── controllers/
│   └── bookController.js   # Business logic for all book operations
│
├── middleware/
│   └── errorMiddleware.js  # Global error handling (404 + errors)
│
├── models/
│   └── Book.js             # Mongoose schema & model
│
├── routes/
│   └── bookRoutes.js       # Express route definitions
│
├── .env.example            # Environment variable template
├── .gitignore
├── package.json
├── README.md
└── server.js               # App entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/library-backend.git
cd library-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/libraryDB
PORT=5000
NODE_ENV=development
```

### 4. Start the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/books` | Add a new book |
| `GET` | `/api/books` | Get all books (with filters & pagination) |
| `GET` | `/api/books/:id` | Get a single book by ID |
| `PUT` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |
| `GET` | `/api/books/search?title=&author=` | Search by title or author |

### Query Parameters for `GET /api/books`

| Param | Type | Description |
|---|---|---|
| `page` | Number | Page number (default: 1) |
| `limit` | Number | Results per page (default: 10) |
| `genre` | String | Filter by genre |
| `bookType` | String | Filter by `Reference` or `Circulating` |
| `status` | String | Filter by status |
| `sortBy` | String | Field to sort by (default: `createdAt`) |
| `order` | String | `asc` or `desc` (default: `desc`) |

---

## 📦 Book Schema

```json
{
  "bookId": "LIB-00001",
  "title": "Introduction to Algorithms",
  "author": "Thomas H. Cormen",
  "isbn": "978-0262033848",
  "genre": "Computer Science",
  "publisher": "MIT Press",
  "publicationYear": 2009,
  "totalCopies": 5,
  "availableCopies": 5,
  "shelfLocation": "A1-S3",
  "bookType": "Circulating",
  "status": "Available"
}
```

### Field Validations

| Field | Required | Validation |
|---|---|---|
| `title` | ✅ | Non-empty string |
| `author` | ✅ | Non-empty string |
| `isbn` | ✅ | Unique across all books |
| `genre` | ✅ | Non-empty string |
| `publisher` | ✅ | Non-empty string |
| `totalCopies` | ✅ | Positive integer (≥ 1) |
| `bookType` | ❌ | `Reference` or `Circulating` |
| `status` | ❌ | `Available`, `Unavailable`, `Reserved`, `Damaged` |

---

## 🧪 Example API Requests & Responses

### ➕ POST /api/books — Add a Book

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "978-0132350884",
  "genre": "Software Engineering",
  "publisher": "Prentice Hall",
  "publicationYear": 2008,
  "totalCopies": 3,
  "shelfLocation": "B2-S1",
  "bookType": "Circulating"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "bookId": "LIB-00001",
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "genre": "Software Engineering",
    "publisher": "Prentice Hall",
    "publicationYear": 2008,
    "totalCopies": 3,
    "availableCopies": 3,
    "shelfLocation": "B2-S1",
    "bookType": "Circulating",
    "status": "Available",
    "_id": "665f1234abc...",
    "createdAt": "2024-06-04T10:00:00.000Z",
    "updatedAt": "2024-06-04T10:00:00.000Z"
  }
}
```

---

### 📋 GET /api/books — Get All Books

**Response (200):**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "total": 25,
  "page": 1,
  "totalPages": 3,
  "count": 10,
  "data": [...]
}
```

---

### 🔍 GET /api/books/search?title=clean

**Response (200):**
```json
{
  "success": true,
  "message": "Search results retrieved successfully",
  "total": 1,
  "count": 1,
  "data": [{ "title": "Clean Code", ... }]
}
```

---

### ✏️ PUT /api/books/:id — Update a Book

**Request Body:**
```json
{
  "totalCopies": 5,
  "availableCopies": 4,
  "shelfLocation": "C3-S2"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### 🗑️ DELETE /api/books/:id

**Response (200):**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": { "id": "665f1234abc...", "title": "Clean Code" }
}
```

---

## ❌ Error Responses

```json
{ "success": false, "message": "Book with ID \"...\" not found" }          // 404
{ "success": false, "message": "A book with ISBN \"...\" already exists" } // 400
{ "success": false, "message": "Internal Server Error" }                   // 500
```

---

## 🌐 Deployment on Render

### Step-by-Step

1. **Push project to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: Library Management System API"
git branch -M main
git remote add origin https://github.com/your-username/library-backend.git
git push -u origin main
```

2. **Create a MongoDB Atlas Cluster**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a free M0 cluster
   - Add a database user with username/password
   - Whitelist IP: `0.0.0.0/0` (allow all)
   - Copy the connection string

3. **Deploy on Render**
   - Go to [render.com](https://render.com) → **New Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** `Node`
   - Add Environment Variables:
     - `MONGO_URI` → your MongoDB Atlas connection string
     - `NODE_ENV` → `production`
   - Click **Deploy**

Your API will be live at: `https://your-app-name.onrender.com`

---

## 📮 Postman Collection

Import into Postman using the JSON in `LibraryAPI.postman_collection.json`.

---

## 📄 License

MIT License
