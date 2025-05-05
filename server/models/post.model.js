const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  });
  
  module.exports = mongoose.model('Post', PostSchema);
  