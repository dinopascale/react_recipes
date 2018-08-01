const express = require('express');
const { ObjectId } = require('mongoose').Types;

const Rate = require('../models/rate');
const Recipe = require('../models/recipe');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/rate/:id', checkAuth, async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('No Recipe Id');
    }

    const ratedBefore = await Rate.find({
      userId: res.locals.issuerId,
      recipeId: req.params.id
    }).countDocuments();

    if (ratedBefore) {
      console.log(ratedBefore);
      throw new Error('Already rated!');
    }

    const rate = await new Rate({
      recipeId: new ObjectId(req.params.id),
      userId: new ObjectId(res.locals.issuerId),
      value: req.body.value,
      date: new Date()
    }).save();

    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { rateCount: 1, rateValue: req.body.value } },
      { new: true }
    );

    console.log(recipe._doc);

    res.status(200).json({
      status: 'Ok',
      newRateValue: recipe._doc.rateValue,
      newRateCount: recipe._doc.rateCount
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
});

module.exports = router;
