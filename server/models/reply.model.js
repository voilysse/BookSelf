const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review:{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        required: true
    },
    text:{
        type: String,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Reply', ReplySchema);