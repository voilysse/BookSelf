const express = require("express");
const router = express.Router();

const Author = require("../models/author.model.js");

// get all authors
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find().populate("books", "title");
    res.status(200).json({ authors });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single author by id
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate(
      "books",
      "title"
    );

    if (!author) return res.status(404).json({ msg: "Author not found." });

    res.status(200).json({ author });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new author
router.post("/create", async (req, res) => {
  try {
    const { name, biography, birthDate, deathDate } = req.body;

    const newAuthor = await Author.create({
      name,
      biography,
      birthDate,
      deathDate,
    });
    const author = await newAuthor.save();
    res.status(201).json({ author });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update author
router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          biography: req.body.biography,
          birthDate: req.body.birthDate,
          deathDate: req.body.deathDate,
        },
      },
      { new: true }
    );
    res.status(200).json({ msg: "Author updated.", author });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete author
router.delete("/:id", async (req, res) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ msg: "Author deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get books
router.get("/:id/books", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate(
      "books",
      "title"
    );
    if (!author) return res.status(404).json({ msg: "Author not found." });

    res.status(200).json({ books: author.books });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
