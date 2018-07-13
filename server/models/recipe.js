const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  preparationTime: {
    type: Number,
    required: true
  },
  cookTime: {
    type: Number,
    required: true
  },
  serves: {
    type: Number
  },
  difficulty: {
    type: String,
    required: true,
    trim: true
  },
  sharable: {
    type: Boolean,
    default: true
  },
  _creator: {
    type: String
    // required: true
  },
  img: {
    type: String
    // default:
  },
  directions: {
    type: String,
    trim: true,
    minlength: 100
  },
  tag: {
    type: String,
    default: 'Omnivore'
  },
  rateCount: {
    type: Number,
    default: 0
  },
  rateValue: {
    type: Number,
    default: 0
  },
  ingredients: [
    {
      _id: false,
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Recipe', recipeSchema);
