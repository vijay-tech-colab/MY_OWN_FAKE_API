const express = require("express");
require('dotenv').config({path : './config.env'});
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI 
console.log(process.env.PORT)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err.message));
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Programming", "Design", "Marketing", "Business", "Photography"],
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  duration: {
    type: Number, // in hours
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the Online Course API');
});

app.get("/api/v1/courses", async (req, res) => {
  try {
    // Copy query params
    const queryObj = { ...req.query };
    // Fields to exclude from filtering
    const excludeFields = ["sort", "fields", "page", "limit"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let query = Course.find(queryObj);

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }

    // LIMITING FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    }

    // PAGINATION
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const courses = await query;
    const totalDocs = await Course.countDocuments();
    res.json({
      data: {

        length: courses.length,
        courses,
        totalDocs
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/api/v1/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Invalid course ID" });
  }
});

// FAKE POST route (no data will be saved)
app.post("/api/v1/courses", (req, res) => {
  console.log("Received fake course data:", req.body);
  res.status(201).json({ message: "Course saved successfully (fake)" });
});

// FAKE PATCH route (no update will be done)
app.patch("/api/v1/courses/:id", (req, res) => {
  console.log(`Fake update for course ID ${req.params.id}:`, req.body);
  res.json({ message: "Course updated successfully (fake)" });
});

// FAKE DELETE route (no delete will be done)
app.delete("/api/v1/courses/:id", (req, res) => {
  console.log(`Fake delete for course ID ${req.params.id}`);
  res.json({ message: "Course deleted successfully (fake)" });
});
// 404 handler for unknown routes

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log("surver running....");
});
