const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const users = await User.find({}, { password: 0, _id: 0}).populate("reviews").sort({ _id: -1 });

        res.json(users);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        var decoded = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET)
        const user = await User.findById({ _id: decoded._id }).populate("reviews").populate("shelves");
        
        if(!user) return res.status(400).json({msg: "User does not exist"});
        res.json(user);
    }catch(err){
        res.status(400).json(err);
    }  
});

module.exports = router;