import express from "express";
import 'dotenv/config';
import { pool } from './db.js';
import studentRoutes from './routes/StudentRoutes.js';

pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch((error: unknown) => {
    console.error('Database connection failed. Check .env, Supabase, and your network.', error);
  });

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Shared logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// JSON body parser
app.use(express.json());
app.use('/students', studentRoutes);

// GET /
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Student Information API",
    course: "ITE 303"
  });
});

// GET /students/:id
app.get("/students/:id", (req, res) => {
  const studentId = req.params.id;

  console.log("Dynamic route handler reached");

  res.status(200).json({
    message: "Student request received",
    studentId: studentId
  });
});

// POST /students
app.post("/students", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      message: "name and course are required"
    });
  }

  res.status(200).json({
    message: "Student received",
    student: {
      name: name,
      course: course
    }
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Student API listening on port ${PORT}`);
});