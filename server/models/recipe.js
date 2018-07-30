const mongoose = require('mongoose');
const validator = require('validator');

const User = require('./user');

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
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  img: {
    type: String,
    trim: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a URL'
    }
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

recipeSchema.statics.findByIdAndGetAuthor = async function(id) {
  try {
    const Recipe = this;
    const recipe = await Recipe.findById(id).select(
      '-__v -rateCount -rateValue'
    );

    if (!recipe) {
      const e = new Error('No Recipe Found');
      e.status = 401;
      throw e;
    }

    const user = await User.findById(recipe._doc._creator).select('username');
    return { ...recipe._doc, _creator: user };
  } catch (e) {
    throw e;
  }
};

module.exports = mongoose.model('Recipe', recipeSchema);
