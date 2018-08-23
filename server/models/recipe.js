const mongoose = require('mongoose');
const validator = require('validator');

const User = require('./user');

const creatorSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  avatar: {
    type: String,
    trim: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/240px-Placeholder_no_text.svg.png',
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a URL'
    }
  }
});

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
  _creator: creatorSchema,
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
        required: true
      },
      quantity: {
        type: String,
        required: true
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
    const recipe = await Recipe.findById(id).select('-__v');

    if (!recipe) {
      const e = new Error('No Recipe Found');
      e.status = 401;
      throw e;
    }

    const user = await User.findById(recipe._doc._creator._id).select(
      'username'
    );
    return { ...recipe._doc, _creator: user };
  } catch (e) {
    throw e;
  }
};

module.exports = mongoose.model('Recipe', recipeSchema);
