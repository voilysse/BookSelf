require('dotenv/config');
const express = require('express');

const User = require("../models/user.model");
const router = express.Router();


const passport = require('passport');


// [/api/users] /
// GET (PUBLIC)
// retrieve all users
router.get('/', (req, res) => {
  User.find({}, { password: 0, _id: 0})
    .populate('reviews')
    .then(users => {
      res.status(200).json({
        users,
      });
    });
});

// [/api/users] /:id
// GET (PUBLIC)
// get info from a single user
router.get('/:id', (req, res) => {
  User.findById(req.params.id).populate("reviews")
    .then(user => res.status(200).json({ user }))
    .catch(err =>
      res.status(400).json({ msg: 'User does not exist', err })
    );
});

// [/api/users] /update
// POST (PRIVATE)
// update an user
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(req.body.id, req.body, {
      useFindAndModify: false,
    })
      .then(user => res.status(200).json({ msg: 'User updated', user }))
      .catch(err =>
        res.status(400).json({ msg: 'Failed to update user', err })
      );
  }
);

// [/api/users] /delete
// DELETE (PRIVATE)
// delete an user
router.post(
  '/delete',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findByIdAndDelete(req.body.id)
      .then(() => res.status(200).json({ msg: 'User deleted' }))
      .catch(err =>
        res.status(400).json({ msg: 'Failed to delete user', err })
      );
  }
);

module.exports = router;