const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: [{
        type: String
    }],
    summary: {
        type: String
    },
    cover: {
        type: String
    },
    ISBN: {
        type: String,
        unique: true
    },
    genre: [{
        type: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Book', bookSchema);