const mongoose = require('mongoose');

const CommentRate = require('../models/rate/rateComment');
const CustomComment = require('../models/comment');

const options = { discriminatoryKey: 'kind' };

const threadSchema = new mongoose.Schema(
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

threadSchema.pre('save', function(next) {
  this.createdAt = this.createdAt ? this.createdAt : new Date();
  this.updatedAt = new Date();
  this.totalRate = this.totalRate ? this.totalRate : 0;
  next();
});

threadSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

threadSchema.post('find', async function(threads) {
  for (let thread of threads) {
    const rates = await CommentRate.find({ commentId: thread._id }).select(
      'value'
    );
    thread.totalRate = rates.reduce((sum, rate) => sum + rate.value, 0);
  }
});

threadSchema.post('remove', async function(removed) {
  const ratesToDelete = await CommentRate.deleteMany({
    commentId: removed._id
  });
  console.log('CustomComment', CommentRate);
});

module.exports = mongoose.model('Thread', threadSchema);
