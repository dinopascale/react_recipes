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
    // const num = req.query.num || 4;
    // const recipes = await Recipe.find({ sharable: true })
    //   .limit(+num)
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
    //     request: {
    //       methods: ['GET'],
    //       endpoint: req.headers.host + '/api/recipe/' + recipe._doc._id
    //     },
    //     rateCount,
    //     rateValue
    //   };
    // });

    const resultsUnsorted = await Recipe.findByAvgRate();

    //sort by avgRate

    const resultsByDate = resultsUnsorted.sort((a, b) => b.avgRate - a.avgRate);

    //pagination --- skip

    res.status(200).json({
      total: resultsByDate.length,
      results: resultsByDate.slice(0, 6)
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/recipes/recent', async (req, res, next) => {
  try {
    const resultsByDate = await Recipe.findAndSortByDate();
    res.status(200).json({
      total: resultsByDate.length,
      results: resultsByDate.slice(0, 6)
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
      message: 'New Recipe Added!',
      recipeCreated: {
        ...recipe._doc,
        request: {
          methods: ['GET'],
          endpoint: req.headers.host + '/api/recipes/'
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
      schema
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

    const recipe = await Recipe.findByIdAndGetAuthor(id);
    //GET ALL RATES FOR RECIPE
    const rates = await RecipeRate.find({
      recipeId: id
    }).select('value userId');

    const rateValue = rates.reduce((sum, rate) => sum + rate.value, 0);
    const rateCount = rates.length;

    if (
      res.locals.issuerId &&
      res.locals.issuerId.equals(recipe._creator._id)
    ) {
      isAuthor = true;
    }

    //CHECK IF RATED BEFORE
    if (!isAuthor && rates.length > 0 && res.locals.issuerId) {
      const userRate = rates.find(rate => {
        return res.locals.issuerId.equals(rate.userId);
      });
      if (userRate) {
        userRateValue = userRate.value;
      }
    }

    const difficultyObject = {
      value: recipe.difficulty,
      options: ['easy', 'medium', 'hard']
    };

    res.status(200).json({
      recipe: {
        ...recipe,
        difficulty: difficultyObject,
        isAuthor,
        rateValue,
        rateCount,
        ratedBefore: !!userRateValue,
        userRateValue,
        request: {
          methods: ['UPDATE', 'DELETE'],
          endpoint: req.headers.host + '/api/recipes/' + recipe._id
        }
      }
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
        message: `No recipe with ID: ${id} was found`
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
      message: 'Recipe Updated!',
      request: {
        methods: ['GET'],
        endpoint: req.headers.host + '/api/recipes/'
      }
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
        message: `No recipe with ID: ${id} was found`
      });
    }

    res.status(200).json({
      message: 'Recipe Deleted',
      request: {
        methods: ['GET'],
        endpoint: req.headers.host + '/api/recipes/'
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

module.exports = router;
