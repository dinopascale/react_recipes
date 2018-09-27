const mongoose = require('mongoose');
const Rate = require('./rate');
const Recipe = require('../recipe');

const recipeRateSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const RecipeRate = Rate.discriminator('RecipeRate', recipeRateSchema);

module.exports = mongoose.model('RecipeRate');
