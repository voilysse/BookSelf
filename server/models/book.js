const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    },
    summary: {
        type: String
    },
    cover: {
        type: String
    },
    ISBN: {
        type: String,
    },
    genre: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

module.exports = mongoose.model('Book', bookSchema);