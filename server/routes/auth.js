const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const userExists = await User.findOne({ email })
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
    }catch(err){
        res.status(400).json(err);
    }
})

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email) return res.status(400).json({msg: "Enter valid email"});
        if(!password) return res.status(400).json({msg: "Enter valid password"});

        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({msg: "User does not exists"});

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Incorrect password"});
        
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        res.json({token, user: {userId: user._id, username: user.username}});
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;