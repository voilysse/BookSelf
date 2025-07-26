const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware.js");
const Thread = require("../models/thread.model.js");
const Post = require("../models/post.model.js");

// get all threads
router.get("/threads", async (req, res) => {
  try {
    const threads = await Thread.find()
      .populate("user")
      .sort({ created: -1 });

    res.status(200).json({ threads });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all threads by a user
router.get("/threads/user/:userId", async (req, res) => {
  try {
    const threads = await Thread.find({ user: req.params.userId })
      .populate("user")
      .sort({ created: -1 });

    res.status(200).json({ threads });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single thread and posts
router.get("/threads/:id", async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id).populate(
      "user"
    );
    if (!thread) return res.status(404).json({ msg: "Thread not found.", err });

    const posts = await Post.find({ thread: req.params.id })
      .populate("user")
      .sort({ created: -1 });
    
    res.status(200).json({ thread, posts: posts });
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a thread
router.post("/threads", auth, async (req, res) => {
  try {
    const newThread = new Thread({
      title: req.body.title,
      user: req.user.userId,
      text: req.body.text,
      category: req.body.category,
      tags: req.body.tags
    });

    const thread = await newThread.save();
    res.status(201).json({ thread });
  } catch (err) {
    res.status(500).json({ msg: "smt wring not found." });
  }
});

// update thread
router.put("/threads/:id", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found." });

    if (req.user.userId !== thread.user.toString()) {
      return res.status(403).json({ message: "Can't update other's threads." });
    }

    thread.title = req.body.title ?? thread.title;
    thread.text = req.body.text ?? thread.text;

    await thread.save();
    res.status(200).json({ msg: "Thread updated.", thread });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete thread
router.delete("/threads/:id", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found." });

    if (req.user.userId !== thread.user.toString()) {
      return res.status(403).json({ message: "Can't delete other's threads." });
    }

    await thread.deleteOne();
    res.json({ msg: "Thread deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// like
router.post("/threads/:id/like", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (thread.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Thread is already liked." });

    if (thread.dislikes.includes(req.user.userId))
      await thread.updateOne({ $pull: { dislikes: req.user.userId } });

    await thread.updateOne({ $push: { likes: req.user.userId } });

    res.status(200).json({ message: "Thread liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unlike
router.post("/threads/:id/unlike", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (!thread.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Thread is already unliked." });

    await thread.updateOne({ $pull: { likes: req.user.userId } });

    res.status(200).json({ message: "Thread unliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dislike
router.post("/threads/:id/dislike", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (thread.dislikes.includes(req.user.userId))
      return res.status(400).json({ message: "Thread is already liked." });

    if (thread.likes.includes(req.user.userId))
      await thread.updateOne({ $pull: { likes: req.user.userId } });

    await thread.updateOne({ $push: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Thread liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// undislike
router.post("/threads/:id/undislike", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);

    if (!thread.dislikes.includes(req.user.userId))
      return res.status(400).json({ message: "Thread is already undisliked." });

    await thread.updateOne({ $pull: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Thread undisliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

//
//POSTS
//

// get all posts for thread
router.get("/threads/:id/posts", async (req, res) => {
  try {
    const posts = await Post.find({ thread: req.params.id })
      .populate("user")
      .sort({ created: -1 });

    if (!posts) return res.status(404).json({ message: "Thread not found." });

    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts by user
router.get("/user/:id/posts", async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id })
        .populate("user")
        .sort({ created: -1 });
  
      if (!posts) return res.status(404).json({ message: "User not found." });
  
      res.status(200).json({ posts: posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get single reply
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found.", err });

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create post
router.post("/threads/:id/post", auth, async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) return res.status(404).json({ message: "Thread not found." });

    const newPost = await Post.create({
      user: req.user.userId,
      thread: req.params.id,
      text: req.body.text,
    });
    const post = await newPost.save();

    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
router.put("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (req.user.userId !== post.user.toString()) {
      return res.status(403).json({ message: "Can't update other's posts." });
    }

    post.text = req.body.text ?? post.text;

    await post.save();
    res.status(200).json({ msg: "Post updated.", post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post
router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (req.user.userId !== post.user.toString()) {
      return res.status(403).json({ message: "Can't delete other's posts." });
    }

    await post.deleteOne();

    res.json({ msg: "Post deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// like
router.post("/posts/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Post is already liked." });

    if (post.dislikes.includes(req.user.userId))
      await post.updateOne({ $pull: { dislikes: req.user.userId } });

    await post.updateOne({ $push: { likes: req.user.userId } });

    res.status(200).json({ message: "Post liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// unlike
router.post("/posts/:id/unlike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.user.userId))
      return res.status(400).json({ message: "Post is already unliked." });

    await post.updateOne({ $pull: { likes: req.user.userId } });

    res.status(200).json({ message: "Post unliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dislike
router.post("/posts/:id/dislike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.dislikes.includes(req.user.userId))
      return res.status(400).json({ message: "Post is already disliked." });

     if (post.likes.includes(req.user.userId))
      await post.updateOne({ $pull: { likes: req.user.userId } });

    await post.updateOne({ $push: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Post liked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// undislike
router.post("/posts/:id/undislike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.dislikes.includes(req.user.userId))
      return res.status(400).json({ message: "Post is already unliked." });

    await post.updateOne({ $pull: { dislikes: req.user.userId } });

    res.status(200).json({ message: "Post unliked." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
