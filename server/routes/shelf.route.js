const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const User = require("../models/user.model.js");
const Shelf = require("../models/shelf.model.js");

//get all for user
router.get("/:userId/user", async (req, res) => {
  try {
    const shelves = await Shelf.find({ user: req.params.userId }).populate(
      "books",
      "title author"
    );
    res.status(200).json({ shelves });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one
router.get("/:shelfId", async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.params.shelfId).populate(
      "books",
      "title author"
    );

    if (!shelf) return res.status(404).json({ msg: "Shelf not found." });

    res.status(200).json({ shelf });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one by name
router.get("/user/:shelfName", auth, async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      user: req.user.userId,
      name: req.params.shelfName,
    }).populate("books", "title author");

    if (!shelf) return res.status(404).json({ msg: "Shelf not found." });

    res.status(200).json({ shelf });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create shelf
router.post("/create", auth, async (req, res) => {
  try {
    const newShelf = await Shelf.create({
      name: req.body.name,
      user: req.user.userId,
      public: req.body.public ?? true,
      cover: req.body.cover,
      description: req.body.description,
    });
    const shelf = await newShelf.save();
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { shelves: shelf._id },
    });

    res.status(201).json({ shelf });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update shelf
router.put("/:id", auth, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.params.id);
    if (!shelf) return res.status(404).json({ message: "Shelf not found." });

    if (req.user.userId !== shelf.user.toString()) {
      return res.status(403).json({ message: "Can't update other's shelves." });
    }

    if (shelf.default === true) {
      return res.status(403).json({ message: "Can't edit default shelves." });
    }

    shelf.name = req.body.name ?? shelf.name;
    shelf.public = req.body.public ?? shelf.public;
    shelf.cover = req.body.cover ?? shelf.cover;
    shelf.description = req.body.description ?? shelf.description;

    await shelf.save();
    res.status(200).json({ msg: "Shelf updated.", shelf: shelf });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete shelf
router.delete("/:id", auth, async (req, res) => {
  try {
    const shelf = await Shelf.findById(req.params.id);
    if (!shelf) return res.status(404).json({ message: "Shelf not found." });

    if (req.user.userId !== shelf.user.toString()) {
      return res.status(403).json({ message: "Can't update other's shelves." });
    }
    if (shelf.default === true) {
      return res.status(403).json({ message: "Can't delete default shelves." });
    }

    await shelf.deleteOne();
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { shelves: shelf._id },
    });
    res.json({ msg: "Shelf deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//add book
router.post("/:shelfId/add", auth, async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      _id: req.params.shelfId,
      user: req.user.userId,
    });
    if (!shelf) return res.status(404).json({ message: "Shelf not found" });

    if (req.user.userId !== shelf.user.toString()) {
      return res.status(403).json({ message: "Can't update other's shelves." });
    }

    if (shelf.books.includes(req.body.bookId))
      return res.status(400).json({ message: "Book is already added." });

    await shelf.updateOne({ $push: { books: req.body.bookId } });

    res.status(200).json({ message: "Book added." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//remove book
router.post("/:shelfId/remove", auth, async (req, res) => {
  try {
    const shelf = await Shelf.findOne({
      _id: req.params.shelfId,
      user: req.user.userId,
    });
    if (!shelf) return res.status(404).json({ message: "Shelf not found" });

    if (req.user.userId !== shelf.user.toString()) {
      return res.status(403).json({ message: "Can't update other's shelves." });
    }

    if (!shelf.books.includes(req.body.bookId))
      return res.status(400).json({ message: "Book is already removed." });

    await shelf.updateOne({ $pull: { books: req.body.bookId } });

    res.status(200).json({ message: "Book removed." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
