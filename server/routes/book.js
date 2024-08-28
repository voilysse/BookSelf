const express = require('express');
const auth = require('../middleware/auth');

const Book = require('../models/book');
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const books = await Book.find({}).populate("reviews").populate("author").sort({ _id: -1 });

        res.json(books);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate("reviews").populate("author");
        if (!book) return res.status(404).json({ msg: 'Book cannot be found' });

        res.json(book);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.post('/add', auth, async (req, res) => {
    try{
        const { title, author, summary, rating, cover, ISBN, genre, reviews} = req.body;
        const newBook = await Book.create({
            title,
            author,
            summary,
            rating,
            cover,
            ISBN,
            genre,
            reviews
        });
        const book = await newBook.save();
        res.json(book);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.delete('/delete/:id', auth, async (req, res) =>{
    try {
        const book = await Book.findById(req.params.id).populate("reviews").populate("author");
        if (!book) return res.status(404).json({ msg: 'Book cannot be found' });

        await book.remove()
        res.status(200).json("Book has been deleted");
    } catch (err) {
        return res.status(504).json(err);
    }
});

module.exports = router;