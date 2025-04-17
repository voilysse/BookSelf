const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const router = express.Router();

// Authentication routes

// [/api/users] /register
// POST (PUBLIC)
// register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
 
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
        
        const newUser = await User.create({
            username,
            email,
            password: hash,
        });
        const user = await newUser.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });

});
  
  // [/api/users] /login
  // POST (PUBLIC)
  // login a user
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email) return res.status(400).json({msg: "Enter valid email"});
    if(!password) return res.status(400).json({msg: "Enter valid password"});

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)  return res.status(400).json({ msg: "Incorrect password." });
    
    jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, (err, token) => {
        if (err) 
            res.status(500).json({ msg: "Error signing token.", err });

        /*
        res.cookie('access_token', token, {
            httpOnly: true, 
        });
        res.json({ user: { userId: user._id, username: user.username } });
        */

        res.status(200).json({
            success: true,
            token,
            user: {
            id: user._id,
            username: user.username
            },
        });
    });
});