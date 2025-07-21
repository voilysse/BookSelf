const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const Review = require("../models/review.model.js");
const Reply = require("../models/reply.model.js");

// get all reviews for a book
router.get("/book/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .populate("user")
      .sort({ created: -1 });

    const reviewsWithReplies = await Promise.all(
      reviews.map(async (review) => {
        const replies = await Reply.find({ review: review._id })
          .populate("user")
          .sort({ created: -1 });

        return {
          ...review.toObject(),
          replies, 
        };
      })
    );

    res.status(200).json({ reviews: reviewsWithReplies });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all reviews for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.params.userId })
      .populate("book", "title")
      .sort({ created: -1 });

    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single review
router.get("/:reviewId", async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId).populate(
      "user"
    );
    if (!review) return res.status(404).json({ msg: "Review not found.", err });

    res.status(200).json({ review });
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a review
router.post("/", auth, async (req, res) => {
  try {
    if (!req.body.book || req.body.rating === undefined)
      return res.status(400).json({ message: "Book and rating are required" });

    const newReview = new Review({
      book: req.body.book,
      user: req.user.userId,
      rating: req.body.rating,
      text: req.body.text,
    });

    const review = await newReview.save();
    res.status(201).json({ review });
  } catch (err) {
    res.status(500).json({ msg: "smt wring not found." });
  }
});

// update review
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (req.user.userId !== review.user.toString()) {
      return res.status(403).json({ message: "Can't update other's reviews." });
    }

    review.rating = req.body.rating ?? review.rating;
    review.text = req.body.text ?? review.text;

    await review.save();
    res.status(200).json({ msg: "Review updated.", review });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete review
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    if (req.user.userId !== review.user.toString()) {
      return res.status(403).json({ message: "Can't delete other's reviews." });
    }

    await review.deleteOne();
    res.json({ msg: "Review deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// like
router.post("/:id/like", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (req.user.userId === review.user.toString())
      return res.status(400).json({ message: "Can't like your own review." });

    if (review.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Review is already liked." });

    if (review.dislikes.includes(req.user.userId))
      await review.updateOne({ $pull: { dislikes: req.user.userId } });

    await review.updateOne({ $push: { likes: req.user.userId } });

    res.status(200).json({ message: "Review liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unlike
router.post("/:id/unlike", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (req.user.userId === review.user.toString())
      return res.status(400).json({ message: "Can't like your own review." });
    if (!review.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Review is already unliked." });

    await review.updateOne({ $pull: { likes: req.user.userId } });

    res.status(200).json({ message: "Review unliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dislike
router.post("/:id/dislike", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (req.user.userId === review.user.toString())
      return res.status(400).json({ message: "Can't dislike your own review." });

    if (review.dislikes.includes(req.user.userId))
      return res.status(400).json({ message: "Review is already disliked." });

    if (review.likes.includes(req.user.userId))
      await review.updateOne({ $pull: { likes: req.user.userId } });

    await review.updateOne({ $push: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Review disliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// undislike
router.post("/:id/undislike", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (req.user.userId === review.user.toString())
      return res.status(400).json({ message: "Can't dislike your own review." });
    if (!review.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Review is already undisliked." });

    await review.updateOne({ $pull: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Review undisliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//REPLIES
//

// get all replies for review
router.get("/:id/replies", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const replies = await Reply.find({ review: req.params.id })
      .populate("user")
      .sort({ created: -1 });

    if (!review) return res.status(404).json({ message: "Review not found." });

    res.status(200).json({ replies: replies });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single reply
router.get("/replies/:id", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ msg: "Reply not found.", err });

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create reply
router.post("/replies/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found." });

    const newReply = await Reply.create({
      user: req.user.userId,
      review: req.params.id,
      text: req.body.text,
    });
    const reply = await newReply.save();

    res.status(201).json({ reply });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update reply
router.put("/replies/:id", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ message: "Reply not found." });

    if (req.user.userId !== reply.user.toString()) {
      return res.status(403).json({ message: "Can't update other's replies." });
    }

    reply.text = req.body.text ?? reply.text;

    await reply.save();
    res.status(200).json({ msg: "Reply updated.", reply });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete reply
router.delete("replies/:id", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) return res.status(404).json({ message: "Reply not found." });

    if (req.user.userId !== reply.user.toString()) {
      return res.status(403).json({ message: "Can't delete other's replies." });
    }
    await reply.deleteOne();

    res.json({ msg: "Reply deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// like
router.post("replies/:id/like", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (req.user.userId === reply.user.toString())
      return res.status(400).json({ message: "Can't like your own replies." });

    if (reply.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Reply is already liked." });

    if (reply.dislikes.includes(req.user.userId))
      await reply.updateOne({ $pull: { dislikes: req.user.userId } });

    await reply.updateOne({ $push: { likes: req.user.userId } });

    res.status(200).json({ message: "Reply liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unlike
router.post("replies/:id/unlike", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (req.user.userId === reply.user.toString())
      return res.status(400).json({ message: "Can't like your own replies." });

    if (!reply.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Reply is already unliked." });

    await reply.updateOne({ $pull: { likes: req.user.userId } });

    res.status(200).json({ message: "Reply unliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});


// dislike
router.post("replies/:id/dislike", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (req.user.userId === reply.user.toString())
      return res.status(400).json({ message: "Can't dislike your own replies." });

    if (reply.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Reply is already disliked." });

    if (reply.likes.includes(req.user.userId))
      await reply.updateOne({ $pull: { likes: req.user.userId } });

    await reply.updateOne({ $push: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Reply disliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// undislike
router.post("replies/:id/undislike", auth, async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);

    if (req.user.userId === reply.user.toString())
      return res.status(400).json({ message: "Can't dislike your own replies." });

    if (!reply.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Reply is already undisliked." });

    await reply.updateOne({ $pull: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Reply undisliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
