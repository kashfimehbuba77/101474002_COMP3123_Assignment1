const express = require("express");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/users");

const routes = express.Router();

// Signup
routes.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Email already exists. Please use another email."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user_id: savedUser._id
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// Login
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ status: false, message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ status: false, message: "Invalid username or password" });

    res.status(200).json({
      message: "Login successful"
      // jwt_token: optional
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = routes;
