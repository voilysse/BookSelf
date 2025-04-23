const router = express.Router();
const express = require("express");
const bcryptjs = require("bcryptjs");

const auth = require("../middleware/auth.middleware.js");
const User = require("../models/user.model.js");

// get single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User does not exist.", err });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, _id: 0 });
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user
router.post("/update", auth, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      req.body.password = await bcryptjs.hash(req.body.password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          biography: req.body.biography,
          password: req.body.password,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: "User updated.", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete user
router.delete("/delete", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ msg: "User deleted." });
    res.redirect("/");
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow
router.post("/:id/follow", auth, async (req, res) => {
  try {
    const currUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(req.params.id);

    if (!currUser || !targetUser)
      return res.status(404).json({ message: "User not found." });
    if (req.user.userId === req.params.id)
      return res.status(400).json({ message: "Invalid user." });
    if (targetUser.followers.includes(currUser._id))
      return res.status(400).json({ message: "User is already followed." });

    await currUser.updateOne({ $push: { following: targetUser._id } });
    await targetUser.updateOne({ $push: { followers: currUser._id } });

    res.status(200).json({ message: "User followed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//unfollow
router.post("/:id/unfollow", auth, async (req, res) => {
  try {
    const currUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(req.params.id);

    if (!currUser || !targetUser)
      return res.status(404).json({ message: "User not found." });
    if (req.user.userId === req.params.id)
      return res.status(400).json({ message: "Invalid user." });
    if (!targetUser.followers.includes(currUser._id))
      return res.status(400).json({ message: "User is already unfollowed." });

    await currUser.updateOne({ $pull: { following: targetUser._id } });
    await targetUser.updateOne({ $pull: { followers: currUser._id } });

    res.status(200).json({ message: "User unfollowed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get following
router.get("/:id/following", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "following",
      "username"
    );
    if (!user) return res.status(404).json({ msg: "User not found." });

    res.status(200).json({ following: user.following });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get followers
router.get("/:id/followers", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "followers",
      "username"
    );
    if (!user) return res.status(404).json({ msg: "User not found." });

    res.status(200).json({ followers: user.followers });
  } catch (err) {
    res.status(500).json(err);
  }
});

// block
router.post("/:id/block", auth, async (req, res) => {
  try {
    const currUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(req.params.id);

    if (!currUser || !targetUser)
      return res.status(404).json({ message: "User not found." });
    if (req.user.userId === req.params.id)
      return res.status(400).json({ message: "Invalid user." });
    if (currUser.block.includes(targetUser._id))
      return res.status(400).json({ message: "User is already blocked." });

    await currUser.updateOne({ $push: { block: targetUser._id } });

    res.status(200).json({ message: "User blocked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//unblock
router.post("/:id/unblock", auth, async (req, res) => {
  try {
    const currUser = await User.findById(req.user.userId);
    const targetUser = await User.findById(req.params.id);

    if (!currUser || !targetUser)
      return res.status(404).json({ message: "User not found." });
    if (req.user.userId === req.params.id)
      return res.status(400).json({ message: "Invalid user." });
    if (!currUser.block.includes(targetUser._id))
      return res.status(400).json({ message: "User is already unblocked." });

    await currUser.updateOne({ $pull: { block: targetUser._id } });

    res.status(200).json({ message: "User unblocked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get blocked
router.get("/:id/blocked", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "block",
      "username"
    );
    if (!user) return res.status(404).json({ msg: "User not found." });

    res.status(200).json({ blocked: user.block });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;