const express = require("express");
const UserModel = require("../models/users");

const routes = express.Router();

// ==========================
// SIGNUP
// ==========================
routes.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "Email already exists. Please use another email."
      });
    }

    // ❗ DO NOT HASH HERE — model does it automatically
    const newUser = new UserModel({ username, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user_id: savedUser._id,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// ==========================
// LOGIN
// ==========================
routes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });

    // Use the model's comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports = routes;
