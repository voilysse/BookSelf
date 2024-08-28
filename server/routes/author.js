const express = require("express");

const auth = require("../middleware/auth");

const Author = require("../models/author");
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const author = await Author.find({}).populate("books").sort({ _id: -1 });

        res.json(author);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const author = await Author.findById(req.params.id).populate("books");
        if(!author) return res.status(404).json({msg: "Author does not exist"});
        
        res.json(author);
    }catch(err){
        res.status(400).json(err);
    }  
});

router.post('/add', async (req, res) => {
    try{
        const { name, biography} = req.body;
        const newAuthor = await Author.create({
            name,
            biography
        });
        const author = await newAuthor.save();
        res.json(author);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.delete('/delete/:id', auth, async (req, res) =>{
    try {
        const author = await Author.findById(req.params.id).populate("books");
        if (!author) return res.status(404).json({ msg: 'Author cannot be found' });

        await author.remove()
        res.status(200).json("Author has been deleted");
    } catch (err) {
        return res.status(504).json(err);
    }
});
module.exports = router;