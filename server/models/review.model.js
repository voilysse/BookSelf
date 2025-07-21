const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref:'Book',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text:{
        type: String,
    },
    rating:{
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0 && value <= 5
          },
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Review', reviewSchema);