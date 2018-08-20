const express = require('express');
const { ObjectId } = require('mongoose').Types;

const RecipeRate = require('../models/rate/rateRecipe');
const CommentRate = require('../models/rate/rateComment');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//RATE RECIPE
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

//RATE COMMENT
router.post('/rate/c/:id', checkAuth, async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('No Comment Id');
    }

    const ratedBefore = await CommentRate.find({
      userId: res.locals.issuerId,
      commentId: req.params.id
    }).countDocuments();

    if (ratedBefore) {
      throw new Error('Already rated!');
    }

    const rate = await new CommentRate({
      commentId: new ObjectId(req.params.id),
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

//PATCH RATE ON COMMENT

router.patch('/rate/c/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    if (!id || !value) {
      throw new Error('No Comment Id or no Value to patch');
    }

    if (!res.locals.issuerId) {
      throw new Error('Not auth');
    }

    const rateToUpdate = await CommentRate.findOneAndUpdate(
      {
        commentId: id,
        userId: res.locals.issuerId
      },
      { $set: { value } },
      { new: true }
    );

    res.status(200).json({
      status: 'Ok',
      newValue: value
    });
  } catch (e) {
    e.status = 401;
    next(e);
  }
});

module.exports = router;
