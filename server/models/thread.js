const mongoose = require('mongoose');
const { Comment, commentSchema } = require('./comment');

const Thread = Comment.discriminator(
  'Thread',
  new mongoose.Schema({
    response: [commentSchema]
  })
);

module.exports = mongoose.model('Thread');
