const express = require("express");

const auth = require("../middleware/auth");

const Review = require("../models/review");
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const reviews = await Review.find({}).populate("book").populate("user").sort({ _id: -1 });

        res.json(reviews);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const review = await Review.findById(req.params.id).populate("book").populate("user");
        if (!review) return res.status(404).json({ msg: 'Review cannot be found' });

        res.json(review);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.post('/add', async (req, res) => {
    try{
        const { book, user, comment, rating} = req.body;
        const newReview = await Review.create({
            book,
            user,
            comment,
            rating
        });
        const review = await newReview.save();
        res.json(review);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.delete('/delete/:id', auth, async (req, res) =>{
    try {
        const review = await Review.findById(req.params.id).populate("user").populate("book");
        if (!review) return res.status(404).json({ msg: 'Review cannot be found' });

        await review.remove()
        res.status(200).json("Review has been deleted");
    } catch (err) {
        return res.status(504).json(err);
    }
});

module.exports = router;