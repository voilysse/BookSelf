const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref:'Book'
    }]
})

module.exports = mongoose.model('Genre', genreSchema);