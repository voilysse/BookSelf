const express = require("express");
const router = express.Router();

const Book = require("../models/book.model.js");
const Author = require("../models/author.model.js");

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single book by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");

    if (!book) return res.status(404).json({ msg: "Book not found." });

    res.status(200).json({ book });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create book
router.post("/create", async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      summary: req.body.summary,
      cover: req.body.cover,
      ISBN: req.body.ISBN,
      genre: req.body.genre,
      released: req.body.released,
      language: req.body.language
    });
    const book = await newBook.save();

    await book.updateOne({ $push: { author: req.body.authorId } });

    await Author.updateMany(
      { _id: { $in: req.body.authorId } },
      { $push: { books: book._id } }
    );

    res.status(201).json({ book });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update book
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) return res.status(404).json({ msg: "Book not found" });

    res.json({ msg: "Book deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get authors
router.get("/:id/authors", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name");
    if (!book) return res.status(404).json({ msg: "Book not found." });

    res.status(200).json({ author: book.author });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
