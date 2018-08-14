const mongoose = require('mongoose');

const options = { discriminatoryKey: 'kind' };

const rateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  options
);

module.exports = mongoose.model('Rate', rateSchema);
