const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const User = require('./user');

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
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
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
  ingredients: [
    {
      _id: false,
      name: {
        type: String,
        required: true,
        validate: {
          validator: validator.isAlphanumeric,
          message: '{VALUE} must contain only letters and numbers'
        }
      },
      quantity: {
        type: String,
        required: true,
        validate: {
          validator: validator.isAlphanumeric,
          message: '{VALUE} must contain only letters and numbers'
        }
      }
    }
  ]
});

recipeSchema.pre('save', function(next) {
  this.createdAt = this.createdAt ? this.createdAt : new Date();
  this.updatedAt = new Date();
  next();
});

recipeSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

recipeSchema.statics.findByIdAndGetAuthor = async function(id) {
  try {
    const Recipe = this;
    const obId = new ObjectId(id);
    const recipe = await Recipe.findOne({ _id: obId })
      .populate('_creator', 'username')
      .select('-__v');

    if (!recipe) {
      const e = new Error('No Recipe Found');
      e.status = 401;
      throw e;
    }
    return { ...recipe._doc };
  } catch (e) {
    throw e;
  }
};

module.exports = mongoose.model('Recipe', recipeSchema);
