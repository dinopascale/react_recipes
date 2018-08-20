const mongoose = require('mongoose');
const CommentRate = require('../models/rate/rateComment');

const options = { discriminatoryKey: 'kind' };

const commentSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      required: true,
      maxlength: 400
    },
    createdAt: {
      type: Date
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

commentSchema.pre('save', function(next) {
  this.createdAt = this.createdAt ? this.createdAt : new Date();
  this.updatedAt = new Date();
  this.totalRate = this.totalRate ? this.totalRate : 0;
  next();
});

commentSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

commentSchema.post('find', async function(comments) {
  for (let comment of comments) {
    const rates = await CommentRate.find({ commentId: comment._id }).select(
      'value'
    );
    comment.totalRate = rates.reduce((sum, rate) => sum + rate.value, 0);
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment, commentSchema };
