const express = require('express');
const { ObjectId } = require('mongoose').Types;
const checkAuth = require('../middleware/check-auth');
const checkAuthor = require('../middleware/check-author');

const User = require('../models/user');
const Comment = require('../models/comment');
const Thread = require('../models/thread');
const RecipeRate = require('../models/rate/rateRecipe');
const Recipe = require('../models/recipe');

const router = express.Router();

//ONLY FOR DEV, NOT USABLE IN PRODUCTION

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find({}).select('-__v');
    res.status(200).json({ total: users.length, users });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//USER LOGIN

router.post('/user/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email.trim() || !password.trim()) {
      const e = new Error('Email and Password are required');
      e.status = 401;
      throw e;
    }

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();
    const expiresIn = Date.now() + 3600000;

    res
      .status(200)
      .cookie('token', token, { expires: new Date(expiresIn) })
      .cookie('tokenExpireDate', expiresIn)
      .json({
        meta: { message: 'Login Success', sessionExpires: expiresIn },
        data: {
          userInfo: {
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            _id: user._id
          }
        }
      });
  } catch (e) {
    next(e);
  }
});

//USER SIGNUP

router.post('/user/signup', async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const user = await new User({ email, password, username }).save();

    const token = await user.generateAuthToken();
    const expiresIn = Date.now() + 3600000;

    res
      .status(200)
      .cookie('token', token, { expires: new Date(expiresIn) })
      .cookie('tokenExpireDate', expiresIn)
      .json({
        meta: { message: 'Registration completed!', sessionExpires: expiresIn },
        data: {
          userInfo: {
            username: user.username,
            avatar: user.avatar,
            bio: user.bio,
            _id: user._id
          }
        }
      });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//USER LOGOUT

router.post('/user/me/logout', checkAuth, (req, res, next) => {
  res
    .cookie('token', '', { expires: new Date(0) })
    .cookie('tokenExpireDate', '', { expires: new Date(0) })
    .json({
      meta: { message: 'Logout success' },
      data: {}
    });
});

//GET MY ACCOUNT

router.get('/user/me', checkAuth, async (req, res, next) => {
  try {
    const { issuerId, _expiresIn } = res.locals;
    const userId = new ObjectId(issuerId);
    const me = await User.findOne({ _id: userId }).select(
      'username avatar bio'
    );

    if (!me) {
      return res.status(404).json({
        meta: { message: `No user with ID: ${userId} was found` },
        data: {}
      });
    }

    res.status(200).json({
      meta: { message: 'Ok', sessionExpires: _expiresIn },
      data: { user: me }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/user/refresh', checkAuth, async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { issuerId } = res.locals;
    const userId = new ObjectId(issuerId);
    const me = await User.findOne({ _id: userId }).select(
      'username avatar bio'
    );

    if (!me) {
      return res.status(404).json({
        meta: { message: `No user with ID: ${userId} was found` },
        data: {}
      });
    }

    const expiresIn = Date.now() + 3600000;
    // const expiresIn = Date.now() + 900000;

    res
      .cookie('token', token, { expires: new Date(expiresIn) })
      .cookie('tokenExpireDate', expiresIn)
      .json({
        meta: { message: 'Ok' },
        data: { expiresIn }
      });
    // res.json({
    //   greet: 'ciao'
    // });
  } catch (e) {
    console.log(e);
    e.status = 400;
    next(e);
  }
});

//GET SINGLE USER

router.get('/user/:id', async (req, res, next) => {
  try {
    let authorId = new ObjectId(req.params.id);
    const user = await User.findById(authorId).select('username avatar bio');

    res.status(200).json({
      meta: { message: 'Ok' },
      data: {
        user
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

router.get('/user/statistics/:id', async (req, res, next) => {
  try {
    const isMe = !!req.query.isMe;
    let userId = new ObjectId(req.params.id);
    const userComments = await Thread.find({ user: userId }).countDocuments();
    const userRates = await RecipeRate.find({ userId }).countDocuments();

    const where = isMe
      ? { _creator: userId }
      : { _creator: userId, sharable: true };

    const userRecipes = await Recipe.find(where).select(
      'img name rateCount rateValue createdAt updatedAt sharable'
    );

    res.status(201).json({
      meta: { message: 'Ok' },
      data: {
        recipes: userRecipes,
        userComments,
        userRates
      }
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//UPDATE SINGLE USER - GUARDED

router.patch('/user/me', checkAuth, async (req, res, next) => {
  try {
    const { issuerId } = res.locals;

    if (!issuerId) {
      const e = new Error('Not Auth');
      e.status = 401;
      throw e;
    }

    const obId = new ObjectId(issuerId);
    const updateFields = { ...req.body };

    const updatedMe = await User.findOneAndUpdate(
      { _id: issuerId },
      {
        $set: updateFields
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      meta: {
        message: 'Ok'
      },
      data: { updatedMe }
    });
  } catch (e) {
    e.status = e.status || 400;
    next(e);
  }
});

//DELETE SINGLE USER - GUARDED

router.delete('/user/:id', checkAuth, checkAuthor, async (req, res, next) => {
  try {
    const { id } = res.locals;
    const obId = new ObjectId(id);

    const deletedUser = await User.findByIdAndRemove(obId);

    if (!deletedUser) {
      return res.status(404).json({
        message: `No user with ID: ${id} was found`
      });
    }

    res.status(200).json({
      meta: {
        message: 'User Deleted'
      },
      data: {}
    });
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

//getSchema

router.post('/s/user', async (req, res, next) => {
  try {
    const { filter } = req.body;
    const schema =
      filter === 'auth'
        ? User.getSchema('username', 'password', 'email')
        : User.getSchema();
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

//refresh cookie

module.exports = router;
