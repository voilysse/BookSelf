const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'Author'
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
    language: {
        type: String
    },
    released: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Book', bookSchema);