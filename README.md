# 📚 Online Course Fake API

A fully functional and flexible REST API built with **Node.js**, **Express**, and **MongoDB** that supports real-time course data retrieval along with **fake CRUD operations** (POST, PATCH, DELETE) for safe frontend development and testing.

---

## 🚀 Key Features

- 🔍 **Filtering, Sorting, Pagination, and Field Limiting**
- 📡 **GET requests** retrieve real data from MongoDB
- ✨ **POST, PATCH, DELETE** are mocked (no real DB changes)
- 🌐 **CORS enabled** — API accessible from any frontend or domain
- 📋 Mongoose validation, enums, and default values
- 🧪 Safe for demos, UI testing, and practice environments

---

## 🧰 Tech Stack

- **Node.js** + **Express** – Backend & routing
- **MongoDB** + **Mongoose** – NoSQL database & schema modeling
- **dotenv** – Environment variable configuration


## 📚 API Endpoints

### ✅ `GET /api/v1/courses`  
Get all courses from the database.

#### 🔎 Query Parameters

| Parameter | Description                      | Example                                       |
|-----------|----------------------------------|-----------------------------------------------|
| category  | Filter by course category        | `/api/v1/courses?category=Design`             |
| sort      | Sort results by one or more fields | `/api/v1/courses?sort=price,-rating`        |
| fields    | Limit fields returned            | `/api/v1/courses?fields=title,price`          |
| page      | Page number for pagination       | `/api/v1/courses?page=2`                      |
| limit     | Number of results per page       | `/api/v1/courses?limit=5`                     |

---

### 🔎 `GET /api/v1/courses/:id`  
Get a single course by its ID.

#### 📤 Response:
```json
{
  "course": {
    "_id": "64e8c934b3c4a2f5eab76b3e",
    "title": "Node.js Bootcamp",
    "...": "other fields"
  }
}

- **CORS** – Cross-origin support for all clients


