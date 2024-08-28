const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const USER_ROLES = require('../constraints');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Invalid email"
          ]
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [USER_ROLES.USER, USER_ROLES.ADMIN],
        default: USER_ROLES.USER
    },
    shelves: [{
        type: Schema.Types.ObjectId,
        ref: 'Shelf'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);