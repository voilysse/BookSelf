const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Shelf = require("../models/shelf.model.js");

// register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ msg: "User already exists." });

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
    });

    // Create default shelves
    const defaultShelfNames = ["Read", "Currently Reading", "Want to Read"];
    const shelfPromises = defaultShelfNames.map((name) =>
      new Shelf({ name, user: newUser._id, default: true }).save()
    );
    const createdShelves = await Promise.all(shelfPromises);

    // Add shelves to user
    newUser.shelves = createdShelves.map((shelf) => shelf._id);
    const user = await newUser.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("access_token", token, {
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error signing token.", err });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ msg: "Enter valid email" });
    if (!password) return res.status(400).json({ msg: "Enter valid password" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found." });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res
      .status(200)
      .json({ user: { userId: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ msg: "Error signing token.", err });
  }
});

//logout
router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ success: true, msg: "Logged out." });
});

module.exports = router;