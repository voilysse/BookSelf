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
  created: {
    type: Date,
    default: Date.now,
  },
  likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
  }]
});

module.exports = mongoose.model('Thread', ThreadSchema);
