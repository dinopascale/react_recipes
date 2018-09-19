const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const DIFFICULTIES = ['easy', 'medium', 'hard'];
const TAG = ['Omnivore', 'Vegetarian', 'Vegan'];

const recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[a-zA-Z0-9\' ,]+$/, 'No special symbol allowed']
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
    default: 'http://pngimg.com/uploads/pasta/pasta_PNG63.png',
    validate: {
      validator: validator.isURL,
      message: '{VALUE} is not a URL'
    }
  },
  directions: {
    type: String,
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
        match: [/^[a-zA-Z0-9\' ,]+$/, 'No special symbol allowed']
      },
      quantity: {
        type: String,
        required: true,
        match: [/^[a-zA-Z0-9\' ,]+$/, 'No special symbol allowed']
      }
    }
  ],
  rateCount: {
    type: Number,
    default: 0
  },
  rateValue: {
    type: Number,
    default: 0
  }
});

const filterRecipeSchema = obj => {
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
        subSchema: obj[key].schema
          ? filterRecipeSchema(obj[key].schema.paths)
          : null
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
  return filterRecipeSchema(Recipe.schema.paths);
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

recipeSchema.statics.findAndSortByAvgRate = async function(tag) {
  try {
    tag = tag || 'Omnivore';
    const Recipe = this;
    const recipes = await Recipe.find({ sharable: true, tag: tag })
      .populate('_creator', 'avatar username')
      .select(
        'name preparationTime cookTime difficulty _creator img tag rateCount rateValue createdAt'
      );

    return recipes.map(recipe => {
      return {
        ...recipe._doc,
        avgRate:
          recipe._doc.rateCount !== 0
            ? recipe._doc.rateValue / recipe._doc.rateCount
            : 0
      };
    });
    // const recipes = await Recipe.find({ sharable: true })
    //   .populate('_creator', 'avatar username')
    //   .select(
    //     'name preparationTime cookTime difficulty _creator img tag rateCount rateValue createdAt'
    //   );

    // const promises = recipes.map(async recipe => {
    //   const rates = await RecipeRate.find({ recipeId: recipe._id }).select(
    //     'value'
    //   );
    //   const rateCount = rates.length;
    //   const rateValue =
    //     rates.length === 0
    //       ? 0
    //       : rates.reduce((sum, rate) => sum + rate.value, 0);
    //   return {
    //     ...recipe._doc,
    //     rateCount,
    //     rateValue,
    //     avgRate: rateCount !== 0 ? +(rateValue / rateCount).toFixed(2) : 0
    //   };
    // });

    // return Promise.all(promises);
  } catch (e) {
    throw e;
  }
};

recipeSchema.statics.findAndSortByDate = async function(tag) {
  try {
    tag = tag || 'Omnivore';
    const Recipe = this;
    const recipes = await Recipe.find({ sharable: true, tag: tag }).sort({
      createdAt: -1
    });
    return recipes.map(recipe => {
      return {
        ...recipe._doc,
        avgRate:
          recipe._doc.rateCount !== 0
            ? recipe._doc.rateValue / recipe._doc.rateCount
            : 0
      };
    });
  } catch (e) {
    throw e;
  }
};

module.exports = mongoose.model('Recipe', recipeSchema);
