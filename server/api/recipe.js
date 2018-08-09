const express = require('express');
const { ObjectId } = require('mongoose').Types;

const User = require('../models/user');
const Recipe = require('../models/recipe');
const Rate = require('../models/rate');

const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const router = express.Router();

//GET ALL RECIPES, PARAM WITH LIMIT ON QUERY

router.get('/recipes', async (req, res, next) => {
  try {
    const num = req.query.num || 4;
    const recipes = await Recipe.find({ sharable: true })
      .limit(+num)
      .select(
        'name preparationTime cookTime difficulty _creator img tag rateCount rateValue'
      );

    res.status(200).json({
      total: recipes.length,
      results: recipes.map(recipe => {
        return {
          ...recipe._doc,
          request: {
            methods: ['GET'],
            endpoint: req.headers.host + '/api/recipe/' + recipe._doc._id
          }
        };
      })
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

//GET SINGLE RECIPE BY ID - ADD "EDITABLE" FIELD IF AUTHOR

router.get('/recipe/:id', checkAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const recipe = await Recipe.findByIdAndGetAuthor(obId);

    let isAuthor = false;
    let ratedBefore = false;
    const difficultyObject = {
      value: recipe.difficulty,
      options: ['easy', 'medium', 'hard']
    };

    if (
      res.locals.issuerId &&
      res.locals.issuerId.equals(recipe._creator._id)
    ) {
      isAuthor = true;
    }

    if (!isAuthor) {
      ratedBefore = !!(await Rate.find({
        userId: res.locals.issuerId,
        recipeId: id
      }).countDocuments());
    }

    res.status(200).json({
      recipe: {
        ...recipe,
        difficulty: difficultyObject,
        isAuthor,
        ratedBefore,
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

    const result = await recipeToUpdate.update({
      $set: updateFields
    });

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
