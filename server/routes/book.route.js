const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const Book = require("../models/book.model.js");

// get single book by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");

    if (!book) return res.status(404).json({ msg: "Book not found." });

    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("reviews");
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create book
router.post("/create", auth, async (req, res) => {
  const { title, author, summary, cover, ISBN, genre } = req.body;

  try {
    const newBook = await Book.create({
      title,
      author,
      summary,
      cover,
      ISBN,
      genre,
    });
    const book = await newBook.save();

    res.status(201).json({ book });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update book
router.put("/:id/update", auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!book) return res.status(404).json({ msg: "Book not found." });

    res.status(200).json({ msg: "Book updated.", book });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete book
router.delete("/:id/delete", auth, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) return res.status(404).json({ msg: "Book not found" });

    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
