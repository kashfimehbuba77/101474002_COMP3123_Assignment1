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

// MongoDB connection
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

// Connect DB before processing each request (Vercel-friendly)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// API Routes
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/emp", employeesRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Express Backend Running on Vercel & Local");
});

// ---------- LOCAL DEVELOPMENT ----------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Local server running at http://localhost:${PORT}`);
    });
  });
}

// ---------- EXPORT FOR VERCEL ----------
module.exports = app;
