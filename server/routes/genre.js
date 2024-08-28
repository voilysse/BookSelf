const express = require("express");

const auth = require("../middleware/auth");

const Genre = require("../models/genre");
const router = express.Router();

router.get('/all', async (req, res) => {
    try{
        const genre = await Genre.find({}).populate("books").sort({ _id: -1 });

        res.json(genre);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const genre = await Genre.findById(req.params.id).populate("books");
        if(!genre) return res.status(404).json({msg: "Genre does not exist"});
        
        res.json(genre);
    }catch(err){
        res.status(400).json(err);
    }  
})

router.post('/add', async (req, res) => {
    try{
        const { name, books} = req.body;
        const newGenre = await Genre.create({
            name,
            books
        });
        const genre = await newGenre.save();
        res.json(genre);
    }catch(err){
        return res.status(504).json(err);
    }
});

router.delete('/delete/:id', auth, async (req, res) =>{
    try {
        const genre = await Genre.findById(req.params.id).populate("books");
        if (!genre) return res.status(404).json({ msg: 'Genre cannot be found' });

        await genre.remove()
        res.status(200).json("Genre has been deleted");
    } catch (err) {
        return res.status(504).json(err);
    }
});
module.exports = router;