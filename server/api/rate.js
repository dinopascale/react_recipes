const express = require('express');
const { ObjectId } = require('mongoose').Types;

const RecipeRate = require('../models/rate/rateRecipe');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/rate/r/:id', checkAuth, async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('No Recipe Id');
    }

    const ratedBefore = await RecipeRate.find({
      userId: res.locals.issuerId,
      recipeId: req.params.id
    }).countDocuments();

    if (ratedBefore) {
      throw new Error('Already rated!');
    }

    const rate = await new RecipeRate({
      recipeId: new ObjectId(req.params.id),
      userId: new ObjectId(res.locals.issuerId),
      value: req.body.value
    }).save();

    res.status(200).json({
      status: 'Ok'
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
});

module.exports = router;
