const mongoose = require('mongoose');
const Rate = require('./rate');
const Recipe = require('../recipe');

const recipeRateSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

// recipeRateSchema.pre('save', async function(next) {
//   try {
//     console.log(this.recipeId, this.value, Recipe);
//     const recipe = await Recipe.find({ _id: this.recipeId }).update(
//       {
//         $inc: { rateCount: 1, rateValue: this.value }
//       },
//       { new: true }
//     );
//     console.log(recipe);
//     next();
//   } catch (e) {
//     next(e);
//   }
// });

const RecipeRate = Rate.discriminator('RecipeRate', recipeRateSchema);

module.exports = mongoose.model('RecipeRate');
