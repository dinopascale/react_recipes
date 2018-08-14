const mongoose = require('mongoose');

const options = { discriminatoryKey: 'kind' };
const commentSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: 400
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date
    },
    totalRate: {
      type: Number
    }
  },
  options
);

const Comment = mongoose.model('Comment', commentSchema);
const Thread = Comment.discriminator(
  'Thread',
  new mongoose.Schema({
    response: [commentSchema]
  })
);

module.exports = { Comment, Thread };
