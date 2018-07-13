const express = require('express');
const { ObjectId } = require('mongoose').Types;

const Recipe = require('../models/recipe');

const router = express.Router();

router.post('/recipes', async (req, res, next) => {
  try {
    const recipe = await new Recipe({
      name: req.body.name,
      preparationTime: req.body.preparationTime,
      cookTime: req.body.cookTime,
      serves: req.body.serves,
      difficulty: req.body.difficulty,
      sharable: req.body.sharable,
      _creator: req.body._creator,
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

router.get('/recipes', async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ sharable: true }).select(
      'name preparationTime cookTime difficulty _creator img tag'
    );

    res.status(200).json({
      total: recipes.length,
      results: recipes.map(recipe => {
        return {
          ...recipe._doc,
          request: {
            methods: ['GET'],
            endpoint: req.headers.host + '/api/recipes/' + recipe._doc._id
          }
        };
      })
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const recipe = await Recipe.findById(obId).select(
      '-__v -rateCount -rateValue'
    );

    if (!recipe) {
      return res.status(404).json({
        message: `No recipe with ID: ${id} was found`
      });
    }

    res.status(200).json({
      recipe: {
        ...recipe._doc,
        request: {
          methods: ['UPDATE', 'DELETE'],
          endpoint: req.headers.host + '/api/recipes/' + recipe._doc._id
        }
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.delete('/recipes/:id', async (req, res, next) => {
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

router.patch('/recipes/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const obId = new ObjectId(id);

    const updateFields = { ...req.body };
    const updatedRecipe = await Recipe.findByIdAndUpdate(obId, {
      $set: updateFields
    });

    if (!updatedRecipe) {
      return res.status(404).json({
        message: `No recipe with ID: ${id} was found`
      });
    }

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

module.exports = router;
