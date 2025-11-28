const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usersRoutes = require("../routes/users");
const employeesRoutes = require("../routes/employees");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy MongoDB connection (serverless-friendly)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  isConnected = true;
  console.log("MongoDB Connected (Vercel)");
}

// Middleware to ensure DB connection before each request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// API Routes
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/emp", employeesRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Express Backend Running on Vercel");
});

module.exports = app;
