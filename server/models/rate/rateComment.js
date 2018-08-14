const mongoose = require('mongoose');
const Rate = require('./rate');

const CommentRate = Rate.discriminator(
  'CommentRate',
  new mongoose.Schema({
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  })
);

module.exports = moongose.model('CommentRate');
