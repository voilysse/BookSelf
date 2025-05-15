const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const Group = require("../models/group.model.js");

// get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("members", "username")
      .populate("creator");
    res.status(200).json({ groups });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single group by id
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members", "username")
      .populate("creator");

    if (!group) return res.status(404).json({ msg: "Group not found." });

    res.status(200).json({ group });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create group
router.post("/create", auth, async (req, res) => {
  try {
    const newGroup = await Group.create({
      name: req.body.name,
      description: req.body.description,
      creator: req.user.userId,
    });
    const group = await newGroup.save();

    res.status(201).json({ group });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update group
router.put("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found." });

    if (req.user.userId !== group.creator.toString()) {
      return res.status(403).json({ message: "Can't update other's groups." });
    }

    group.name = req.body.name ?? group.name;
    group.description = req.body.description ?? group.description;

    await group.save();
    res.status(200).json({ msg: "Group updated.", group });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete group
router.delete("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found." });

    if (req.user.userId !== group.creator.toString()) {
      return res.status(403).json({ message: "Can't delete other's groups." });
    }

    await group.deleteOne();
    res.json({ msg: "Group deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get members
router.get("/:id/members", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "username"
    );
    if (!group) return res.status(404).json({ msg: "Group not found." });

    res.status(200).json({ members: group.members });
  } catch (err) {
    res.status(500).json(err);
  }
});

// join group
router.post("/:id/join", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (group.members.includes(req.user.userId))
      return res.status(400).json({ message: "User is already a member." });

    if (req.user.userId === group.creator.toString()) {
        return res.status(403).json({ message: "Can't join your own groups." });
      }

    await group.updateOne({ $push: { members: req.user.userId } });
    res.status(200).json({ message: "Joined group." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// leave group
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group.members.includes(req.user.userId))
      return res.status(400).json({ message: "User is not a member." });

    if (req.user.userId === group.creator.toString()) {
        return res.status(403).json({ message: "Can't leave your own groups." });
      }
    
    await group.updateOne({ $pull: { members: req.user.userId } });
    res.status(200).json({ message: "Left group." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
