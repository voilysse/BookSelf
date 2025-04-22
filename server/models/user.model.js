const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    avatar:{ 
        type: String 
    },
    biography: {
        type: String
    },
    books_read: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    books_curr: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    books_tbr: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    created: {
        type: Date,
        default: Date.now
    },
    followers:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('User', userSchema);