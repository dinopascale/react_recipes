const mongoose = require('mongoose');
const Rate = require('./rate');

const RecipeRate = Rate.discriminator(
  'RecipeRate',
  new mongoose.Schema({
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  })
);

module.exports = mongoose.model('RecipeRate');
