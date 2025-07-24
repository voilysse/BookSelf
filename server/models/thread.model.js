const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text:{
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  tags: [{
      type: String
  }],
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }],
  dislikes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
});

module.exports = mongoose.model('Thread', ThreadSchema);
