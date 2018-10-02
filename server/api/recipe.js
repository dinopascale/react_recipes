const express = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Recipe = require('../models/recipe');
const RecipeRate = require('../models/rate/rateRecipe');

const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const router = express.Router();

//GET ALL RECIPES, PARAM WITH LIMIT ON QUERY

router.get('/recipes', async (req, res, next) => {
  try {
    const { page, tag } = req.query;
    const prevPage = (+page - 1) * 6;
    const nextPage = +page * 6;

    const resultsUnsorted = await Recipe.findAndSortByAvgRate(tag);

    //sort by avgRate

    const resultsByRate = resultsUnsorted.sort((a, b) => b.avgRate - a.avgRate);

    //pagination --- skip

    res.status(200).json({
      meta: { total: resultsByRate.length },
      data: { results: resultsByRate.slice(prevPage, nextPage) }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/recipes/recent', async (req, res, next) => {
  try {
    const { page, tag } = req.query;

    const prevPage = (+page - 1) * 6;
    const nextPage = +page * 6;

    const resultsByDate = await Recipe.findAndSortByDate(tag);

    res.status(200).json({
      meta: { total: resultsByDate.length },
      data: { results: resultsByDate.slice(prevPage, nextPage) }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//CREATE NEW RECIPE - GUARDED

router.post('/recipe', checkAuth, async (req, res, next) => {
  try {
    const creator = await User.findOne({ _id: res.locals.issuerId }).select(
      'avatar'
    );

    const recipe = await new Recipe({
      name: req.body.name,
      preparationTime: req.body.preparationTime,
      cookTime: req.body.cookTime,
      serves: req.body.serves,
      difficulty: req.body.difficulty,
      sharable: req.body.sharable,
      _creator: {
        _id: res.locals.issuerId,
        avatar: creator._doc.avatar
      },
      img: req.body.img,
      directions: req.body.directions,
      tag: req.body.tag,
      ingredients: req.body.ingredients
    }).save();
    res.status(200).json({
      data: { message: 'New Recipe Added!' },
      data: {
        recipeCreated: {
          ...recipe._doc
        }
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//GET SCHEMA FOR RECIPE

router.get('/s/recipe', checkAuth, async (req, res, next) => {
  try {
    const schema = Recipe.getSchema();
    res.status(200).json({
      meta: { message: 'Ok' },
      data: {
        schema
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//RATED BEFORE SINGLE RECIPE

router.get('/recipe/rated/:recipeId', checkAuthor, async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { issuerId } = res.locals;

    const userRate = await RecipeRate.findOne({
      recipeId: recipeId,
      userId: issuerId
    }).select('value');

    res.status(201).json({
      meta: { rated: !!userRate },
      data: { value: userRate ? userRate._doc.value : 0 }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//GET SINGLE RECIPE BY ID - ADD "EDITABLE" FIELD IF AUTHOR

router.get('/recipe/:id', checkAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    let isAuthor = false;
    let userRateValue = false;

    const queryDbResults = await Recipe.find({ _id: id }).populate(
      '_creator',
      'username'
    );
    const recipe = queryDbResults[0];
    //GET ALL RATES FOR RECIPE
    // const rates = await RecipeRate.find({
    //   recipeId: id
    // }).select('value userId');

    // const rateValue = rates.reduce((sum, rate) => sum + rate.value, 0);
    // const rateCount = rates.length;

    if (
      res.locals.issuerId &&
      res.locals.issuerId.equals(recipe._creator._id)
    ) {
      isAuthor = true;
    }

    //CHECK IF RATED BEFORE --- Probabily we need to separate this
    // if (!isAuthor && rates.length > 0 && res.locals.issuerId) {
    //   const userRate = rates.find(rate => {
    //     return res.locals.issuerId.equals(rate.userId);
    //   });
    //   if (userRate) {
    //     userRateValue = userRate.value;
    //   }
    // }

    // const difficultyObject = {
    //   value: recipe.difficulty,
    //   options: ['easy', 'medium', 'hard']
    // };

    res.status(200).json({
      meta: {
        isAuthor
        // ratedBefore: !!userRateValue,
        // userRateValue
      },
      data: { recipe }
      //   recipe: {
      //     ...recipe,
      //     difficulty: difficultyObject,
      //     isAuthor,
      //     rateValue,
      //     rateCount,
      //     ratedBefore: !!userRateValue,
      //     userRateValue,
      //     request: {
      //       methods: ['UPDATE', 'DELETE'],
      //       endpoint: req.headers.host + '/api/recipes/' + recipe._id
      //     }
      //   }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//UPDATE SINGLE RECIPE - GUARDED

router.patch('/recipe/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const updateFields = { ...req.body };

    //CHECK IF AUTHOR AND CONDITIONALLY UPDATE

    const recipeToUpdate = await Recipe.findById(obId);

    if (!recipeToUpdate) {
      return res.status(404).json({
        meta: { message: `No recipe with ID: ${id} was found` }
      });
    }

    if (!recipeToUpdate._creator.equals(res.locals.issuerId)) {
      const e = new Error('Not Author');
      e.status = 401;
      throw e;
    }

    const result = await recipeToUpdate.update(
      {
        $set: updateFields
      },
      { runValidators: true }
    );

    res.status(200).json({
      meta: { message: 'Recipe Updated!' },
      data: {}
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//DELETE SINGLE RECIPE - GUARDED

router.delete('/recipe/:id', checkAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const deletedRecipe = await Recipe.findByIdAndRemove(obId);

    if (!deletedRecipe) {
      return res.status(404).json({
        meta: { message: `No recipe with ID: ${id} was found` },
        data: {}
      });
    }

    res.status(200).json({
      meta: { message: 'Recipe Deleted' },
      data: {}
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

module.exports = router;
