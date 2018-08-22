const mongoose = require('mongoose');
const Thread = require('./thread');

const Comment = Thread.discriminator(
  'Comment',
  new mongoose.Schema({
    threadId: { type: mongoose.Schema.Types.ObjectId, required: true }
  })
);

module.exports = mongoose.model('Comment');
