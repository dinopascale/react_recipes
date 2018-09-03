const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const TAG = ['Omnivore', 'Vegetarian', 'Vegan'];

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9\' ]+$/, 'No special symbol allowed']
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  preparationTime: {
    type: Number,
    required: true,
    default: '0'
  },
  cookTime: {
    type: Number,
    required: true,
    default: '0'
  },
  serves: {
    type: Number,
    default: '0'
  },
  difficulty: {
    type: String,
    required: true,
    default: 'easy',
    trim: true,
    enum: DIFFICULTIES
  },
  sharable: {
    type: Boolean,
    default: true
  },
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  img: {
    type: String,
    trim: true,
    alias: 'url',
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
    minlength: 100,
    required: true
  },
  tag: {
    type: String,
    default: 'Omnivore',
    enum: TAG
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

const filterSchema = obj => {
  return Object.keys(obj)
    .filter(
      key => !['createdAt', 'updatedAt', '_creator', '_id', '__v'].includes(key)
    )
    .map(key => {
      return {
        name: obj[key].path,
        instance: obj[key].instance,
        default: obj[key].options.default || null,
        validationRules: {
          required: obj[key].options.required || null,
          minlength: obj[key].options.minlength || null,
          regExp: obj[key].options.match
            ? [obj[key].options.match[0].toString(), obj[key].options.match[1]]
            : null
        },
        enum: obj[key].options.enum || null,
        subSchema: obj[key].schema ? filterSchema(obj[key].schema.paths) : null
      };
    });
};

recipeSchema.pre('save', function(next) {
  this.createdAt = this.createdAt ? this.createdAt : new Date();
  this.updatedAt = new Date();
  next();
});

recipeSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: new Date() } });
});

recipeSchema.statics.getSchema = function() {
  const Recipe = this;
  return filterSchema(Recipe.schema.paths);
};

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
