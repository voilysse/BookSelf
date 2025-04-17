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
    comment:{
        type: String,
    },
    rating:{
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0 && value <= 5
          },
    },
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Review', reviewSchema);